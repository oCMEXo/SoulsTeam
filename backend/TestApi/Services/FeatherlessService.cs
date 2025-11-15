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
Верни ТОЛЬКО валидный JSON, без комментариев и текста до/после:

{
  ""summary"": ""краткое описание предложения"",
  ""original"": {
    ""name"": ""название магазина/сервиса"",
    ""items"": ""что включено"",
    ""price"": ""цена с валютой"",
    ""location"": ""адрес или онлайн"",
    ""deliveryTime"": ""время доставки""
  },
  ""alternatives"": [
    {
      ""name"": ""название альтернативы"",
      ""items"": ""что включено"",
      ""price"": ""цена с валютой"",
      ""savings"": ""экономия с валютой"",
      ""savingsPercent"": ""процент экономии"",
      ""extraBenefit"": ""доп. преимущество"",
      ""location"": ""адрес"",
      ""deliveryTime"": ""время доставки"",
      ""rating"": 4.5,
      ""isRecommended"": true
    }
  ]
}

ВАЖНО:
- alternatives должен содержать минимум 1 элемент
- Все строки должны быть заполнены
- rating - число от 0 до 5
- Только JSON, никакого markdown
";

    public FeatherlessService(string apiKey, string model, ILogger<FeatherlessService> logger)
    {
        _model = model;
        _logger = logger;
        _httpClient = new HttpClient();
        _httpClient.BaseAddress = new Uri("https://api.featherless.ai/v1/");
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", apiKey);
    }

    private string ExtractJson(string text)
    {
        // Удаляем markdown блоки если есть
        text = text.Replace("```json", "").Replace("```", "").Trim();
        
        _logger.LogDebug("Text after markdown removal: {Text}", text);
        
        int start = text.IndexOf('{');
        int end = text.LastIndexOf('}');

        if (start == -1 || end == -1)
        {
            _logger.LogWarning("No JSON braces found in text: {Text}", text);
            return "{}";
        }

        string extracted = text.Substring(start, end - start + 1);
        _logger.LogInformation("Extracted clean JSON: {Json}", extracted);
        return extracted;
    }

    public async Task<AiResult?> GetOffersAsync(string userPrompt)
    {
        try
        {
            _logger.LogInformation("Starting AI request with prompt: {Prompt}", userPrompt);

            var body = new
            {
                model = _model,
                messages = new[]
                {
                    new { role = "system", content = SystemPrompt + "\n" + JsonInstruction },
                    new { role = "user", content = userPrompt }
                },
                temperature = 0.7,
                max_tokens = 2000
            };

            var content = new StringContent(
                JsonSerializer.Serialize(body),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync("chat/completions", content);
            
            // ВАЖНО: Проверяем статус ДО EnsureSuccessStatusCode
            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError("API returned error {Status}: {Error}", 
                    response.StatusCode, errorContent);
                return null;
            }

            string rawJson = await response.Content.ReadAsStringAsync();
            _logger.LogInformation("Raw API Response: {Response}", rawJson);

            using var doc = JsonDocument.Parse(rawJson);

            string? modelText =
                doc.RootElement.GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            if (string.IsNullOrWhiteSpace(modelText))
            {
                _logger.LogWarning("Model returned empty content");
                return null;
            }

            _logger.LogInformation("Model text BEFORE extraction: {Text}", modelText);

            string cleanJson = ExtractJson(modelText);

            var result = JsonSerializer.Deserialize<AiResult>(
                cleanJson,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            );

            // Валидация результата
            if (result == null)
            {
                _logger.LogError("Deserialization returned null");
                return null;
            }

            // Проверка Original
            if (result.Original == null)
            {
                _logger.LogWarning("Original is null, creating default");
                result.Original = new OriginalDto
                {
                    Name = "Стандартный вариант",
                    Items = "Не указано",
                    Price = "0",
                    Location = "—",
                    DeliveryTime = "—"
                };
            }

            // Проверка Alternatives
            if (result.Alternatives == null || result.Alternatives.Count == 0)
            {
                _logger.LogWarning("Result has no alternatives, creating default");
                result.Alternatives = new List<AlternativeDto>
                {
                    new AlternativeDto
                    {
                        Name = "Альтернатива не найдена",
                        Items = "Попробуйте уточнить запрос",
                        Price = "0",
                        Savings = "0",
                        SavingsPercent = "0%",
                        ExtraBenefit = "Уточните параметры поиска",
                        Location = "—",
                        DeliveryTime = "—",
                        Rating = 0,
                        IsRecommended = false
                    }
                };
            }
            else
            {
                _logger.LogInformation("Successfully parsed result with {Count} alternatives", 
                    result.Alternatives.Count);
                
                // Логируем каждую альтернативу
                for (int i = 0; i < result.Alternatives.Count; i++)
                {
                    var alt = result.Alternatives[i];
                    _logger.LogDebug("Alternative {Index}: {Name}, Price: {Price}, Savings: {Savings}", 
                        i, alt.Name, alt.Price, alt.Savings);
                }
            }

            return result;
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "JSON parsing failed: {Message}", ex.Message);
            return null;
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "HTTP request failed: {Message}", ex.Message);
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error: {Message}", ex.Message);
            return null;
        }
    }
}