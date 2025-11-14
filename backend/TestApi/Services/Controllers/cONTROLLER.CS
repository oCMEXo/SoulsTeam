using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class AiController : ControllerBase
{
    private readonly FeatherlessService _featherlessService;

    public AiController(FeatherlessService featherlessService)
    {
        _featherlessService = featherlessService;
    }

    [HttpGet("ask")]
    public async Task<IActionResult> Ask(string prompt)
    {
        if (string.IsNullOrWhiteSpace(prompt))
            return BadRequest(new { error = "Prompt не может быть пустым" });

        var result = await _featherlessService.GetChatResponseAsync(prompt);
        return Ok(new { response = result });
    }
}
