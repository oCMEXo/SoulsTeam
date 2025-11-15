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
Ты ассистент, который помогает человеку принимать выгодные финансовые решения.
Отвечай кратко, полезно и ясно.
";

    // Мягкая, но строгая инструкция
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
- Только JSON. Без текста до или после.
- original — объект, а не строка.
- alternatives — массив из минимум одного элемента.
- Все строки должны быть заполнены осмысленными значениями.
- Можно использовать придуманное, но реалистичное.
- Никакого markdown, комментариев, процентов вне строк.
";


    public FeatherlessService(string apiKey, string model)
    {
        _model = model;
        _httpClient = new HttpClient();
        _httpClient.BaseAddress = new Uri("https://api.featherless.ai/v1/");
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", apiKey);
    }

    // Вырезает JSON, если модель добавила лишний текст
    private string ExtractJson(string text)
    {
        int start = text.IndexOf('{');
        int end = text.LastIndexOf('}');

        if (start == -1 || end == -1) return "{}";

        return text.Substring(start, end - start + 1);
    }

    public async Task<AiResult?> GetOffersAsync(string userPrompt)
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

        string rawJson = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(rawJson);

        string? modelText =
            doc.RootElement.GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        if (string.IsNullOrWhiteSpace(modelText))
            return null;

        // гарантируем чистый JSON
        string cleanJson = ExtractJson(modelText);

        // Десериализация в AiResult
        return JsonSerializer.Deserialize<AiResult>(
            cleanJson,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );
    }
}
