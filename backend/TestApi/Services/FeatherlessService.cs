using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using TestApi.Models;

namespace TestApi.Services;

public class FeatherlessService
{
    private readonly HttpClient _httpClient;
    private readonly string _model;

    private const string SystemPrompt = @"
Ты — AI-ассистент по финансовой грамотности.
Помогай человеку принимать выгодные решения. 
Пиши понятно, коротко, без воды. 
Не придумывай статистику. 
Будь доброжелательным.
";

    private const string JsonInstruction = @"
Верни строго JSON формата:

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
      ""rating"": 0.0,
      ""isRecommended"": true
    }
  ]
}

Правила:
- Всегда заполняй ВСЕ поля.
- Если данных нет — придумай реалистичные.
- original НЕ может быть пустым.
- alternatives должен содержать минимум 1 вариант.
- Никакого текста вне JSON.
";

    public FeatherlessService(string apiKey, string model)
    {
        _model = model;
        _httpClient = new HttpClient();
        _httpClient.BaseAddress = new Uri("https://api.featherless.ai/v1/");
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", apiKey);
    }

    private string ExtractJson(string text)
    {
        int start = text.IndexOf('{');
        int end = text.LastIndexOf('}');

        if (start == -1 || end == -1 || end <= start)
            return "{}";

        return text.Substring(start, end - start + 1);
    }

    public async Task<AiOffersResponse?> GetOffersAsync(string userPrompt)
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

        var content = new StringContent(
            JsonSerializer.Serialize(body),
            Encoding.UTF8,
            "application/json"
        );

        var response = await _httpClient.PostAsync("chat/completions", content);
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(json);

        var raw = doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        if (string.IsNullOrWhiteSpace(raw))
            return null;

        var cleanJson = ExtractJson(raw);
        return JsonSerializer.Deserialize<AiOffersResponse>(cleanJson);
    }
}
