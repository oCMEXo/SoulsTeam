using Microsoft.AspNetCore.Mvc;
using TestApi.Services;
using Microsoft.Extensions.Logging;

namespace TestApi.Controllers;

[ApiController]
[Route("ai")]
public class AiController : ControllerBase
{
    private readonly FeatherlessService _featherlessService;
    private readonly MongoDbService _mongoDbService;
    private readonly ILogger<AiController> _logger;

    public AiController(
        FeatherlessService featherlessService, 
        MongoDbService mongoDbService,
        ILogger<AiController> logger)
    {
        _featherlessService = featherlessService;
        _mongoDbService = mongoDbService;
        _logger = logger;
    }

    [HttpGet("ask")]
    public async Task<IActionResult> Ask(string prompt)
    {
        if (string.IsNullOrWhiteSpace(prompt))
            return BadRequest(new { error = "Prompt is required" });

        _logger.LogInformation("Received prompt: {Prompt}", prompt);

        var result = await _featherlessService.GetOffersAsync(prompt);

        if (result == null)
        {
            _logger.LogWarning("AI returned null result");
            return BadRequest(new { error = "AI returned empty result" });
        }

        _logger.LogInformation("Returning result with {Count} alternatives", 
            result.Alternatives?.Count ?? 0);

        return Ok(result);
    }

    [HttpGet("history")]
    public async Task<IActionResult> History(int limit = 50)
    {
        var history = await _mongoDbService.GetChatHistoryAsync(limit);
        return Ok(history);
    }
}
