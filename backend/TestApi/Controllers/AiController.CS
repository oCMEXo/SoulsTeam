using Microsoft.AspNetCore.Mvc;
using TestApi.Services;

namespace TestApi.Controllers;

[ApiController]
[Route("ai")]
public class AiController : ControllerBase
{
    private readonly FeatherlessService _featherlessService;
    private readonly MongoDbService _mongoDbService;

    public AiController(FeatherlessService featherlessService, MongoDbService mongoDbService)
    {
        _featherlessService = featherlessService;
        _mongoDbService = mongoDbService;
    }

    [HttpGet("ask")]
    public async Task<IActionResult> Ask([FromQuery] string prompt)
    {
        if (string.IsNullOrWhiteSpace(prompt))
            return BadRequest(new { error = "Prompt не может быть пустым" });

        var result = await _featherlessService.GetOffersAsync(prompt);

        if (result == null)
            return StatusCode(500, new { error = "AI вернул пустой ответ" });

        // сохраняем только текст
        await _mongoDbService.InsertChatAsync(prompt, result.Summary);

        return Ok(result);
    }

    [HttpGet("history")]
    public async Task<IActionResult> History(int limit = 50)
    {
        var history = await _mongoDbService.GetChatHistoryAsync(limit);
        return Ok(history);
    }
}
