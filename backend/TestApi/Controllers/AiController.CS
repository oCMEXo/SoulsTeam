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
public async Task<IActionResult> Ask(string prompt)
{
    var result = await _featherlessService.GetOffersAsync(prompt);

    if (result == null)
        return BadRequest(new { error = "AI returned empty result" });

    return Ok(result); // ← фронт получает JSON 1-в-1 как нужно
}


    [HttpGet("history")]
    public async Task<IActionResult> History(int limit = 50)
    {
        var history = await _mongoDbService.GetChatHistoryAsync(limit);
        return Ok(history);
    }
}
