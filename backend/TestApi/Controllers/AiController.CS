using Microsoft.AspNetCore.Mvc;
using TestApi.Services;

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

    [HttpGet("ask")]
    public async Task<IActionResult> Ask(string prompt)
    {
        if (string.IsNullOrWhiteSpace(prompt))
            return BadRequest(new { error = "Prompt не может быть пустым" });

        var result = await _featherlessService.GetChatResponseAsync(prompt);

        await _mongoDbService.InsertChatAsync(prompt, result);

        return Ok(new { response = result });
    }
}
