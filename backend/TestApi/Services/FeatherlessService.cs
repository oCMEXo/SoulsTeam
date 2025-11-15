using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using TestApi.Models;
using Microsoft.Extensions.Logging;

namespace TestApi.Services;

public class FeatherlessService
{
    private readonly HttpClient _httpClient;
    private readonly string _model;
    private readonly ILogger<FeatherlessService> _logger;

    private const string SystemPrompt = @"
Ты ассистент, который помогает человеку принимать выгодные финансовые решения.
Отвечай кратко, полезно и ясно.
";

    private const string JsonInstruction = @"
Верни ТОЛЬКО валидный JSON:

{
  ""summary"": ""string"",
  ""original"": {
    ""name"": ""string"",
    ""items"": ""string"",
    ""price"": ""string"",
    ""location"": ""string"",
    ""deliveryTime"": ""string""
  },
  ""alternatives"": [
    {
      ""name"": ""string"",
      ""items"": ""string"",
      ""price"": ""string"",
      ""savings"": ""string"",
      ""savingsPercent"": ""string"",
      ""extraBenefit"": ""string"",
      ""location"": ""string"",
      ""deliveryTime"": ""string"",
      ""rating"": 4.5,
      ""isRecommended"": true
    }
  ]
}

Только JSON. Без markdown, текста до или после.
";

    public FeatherlessService(string apiKey, string model, ILogger<FeatherlessService> logger)
    {
        _model = model;
        _logger = logger;

        _httpClient = new HttpClient
        {
            BaseAddress = new Uri("https://api.featherless.ai/v1/")
        };

        _httpClient.DefaultRequestHeaders.Authorization = 
            new AuthenticationHeaderValue("Bearer", apiKey);
    }

    private string ExtractJson(string text)
    {
        text = text.Replace("```json", "").Replace("```", "").Trim();

        int start = text.IndexOf('{');
        int end = text.LastIndexOf('}');

        return (start == -1 || end == -1) ? "{}" : text.Substring(start, end - start + 1);
    }

    public async Task<AiResult?> GetOffersAsync(string userPrompt)
    {
        try
        {
            var body = new
            {
                model = _model,
                messages = new[]
                {
                    new { role = "system", content = SystemPrompt + "\n" + JsonInstruction },
                    new { role = "user", content = userPrompt }
                }
            };

            var httpContent = new StringContent(
                JsonSerializer.Serialize(body),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync("chat/completions", httpContent);
            if (!response.IsSuccessStatusCode)
                return null;

            var raw = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(raw);

            var aiText = doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            if (string.IsNullOrWhiteSpace(aiText))
                return null;

            var clean = ExtractJson(aiText);

            var result = JsonSerializer.Deserialize<AiResult>(clean,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return result;
        }
        catch
        {
            return null;
        }
    }
}
