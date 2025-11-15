using Microsoft.AspNetCore.Mvc;
using TestApi.Services;

namespace TestApi.Controllers;

[ApiController]
[Route("ai")]
public class AiController : ControllerBase
{
    private readonly FeatherlessService _featherlessService;
    private readonly MongoDbService _mongo;
    private readonly ILogger<AiController> _logger;

    public AiController(
        FeatherlessService featherlessService,
        MongoDbService mongo,
        ILogger<AiController> logger)
    {
        _featherlessService = featherlessService;
        _mongo = mongo;
        _logger = logger;
    }

    [HttpGet("ask")]
    public async Task<IActionResult> Ask(string prompt)
    {
        if (string.IsNullOrWhiteSpace(prompt))
            return BadRequest(new { error = "Prompt required" });

        var result = await _featherlessService.GetOffersAsync(prompt);
        if (result == null)
            return BadRequest(new { error = "AI returned empty result" });

        // IMPORTANT: безопасно записываем историю
        _ = _mongo.InsertChatAsync(prompt, result.Summary);

        return Ok(result);
    }

    [HttpGet("history")]
    public async Task<IActionResult> History(int limit = 50)
    {
        var history = await _mongo.GetChatHistoryAsync(limit);
        return Ok(history);
    }
}
