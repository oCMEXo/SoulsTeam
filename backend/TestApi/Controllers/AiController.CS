using Microsoft.AspNetCore.Mvc;
using TestApi.Services;
using TestApi.Models;

namespace TestApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AiController : ControllerBase
{
    private readonly FeatherlessService _featherlessService;
    private readonly MongoDbService _mongoDbService;

    public AiController(FeatherlessService featherlessService, MongoDbService mongoDbService)
    {
        _featherlessService = featherlessService;
        _mongoDbService = mongoDbService;
    }

    // Форматируем под фронтенд
    private object AdaptForFrontend(AiOffersResponse ai)
    {
        var original = ai.Offers.FirstOrDefault(o => o.IsOriginal);
        var alternatives = ai.Offers.Where(o => !o.IsOriginal).ToList();

        return new
        {
            summary = ai.Summary,
            original = original,
            alternatives = alternatives,
            totalPrice = ai.TotalPrice,
            totalSavings = ai.TotalSavings
        };
    }

    [HttpGet("ask")]
    public async Task<IActionResult> Ask(string prompt)
    {
        if (string.IsNullOrWhiteSpace(prompt))
            return BadRequest(new { error = "Prompt не может быть пустым" });

        var result = await _featherlessService.GetOffersAsync(prompt);

        if (result == null)
            return StatusCode(500, new { error = "AI вернул пустой ответ" });

        // Логируем запрос и summary
        await _mongoDbService.InsertChatAsync(prompt, result.Summary);

        var adapted = AdaptForFrontend(result);

        return Ok(adapted);
    }

    [HttpGet("history")]
    public async Task<IActionResult> History(int limit = 50)
    {
        var history = await _mongoDbService.GetChatHistoryAsync(limit);
        return Ok(history);
    }
}
