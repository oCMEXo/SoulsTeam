using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using TestApi.Models;


namespace TestApi.Services;

public class FeatherlessService
{
    private readonly HttpClient _httpClient;
    private readonly string _model;

    // Твой системный промт
    private const string SystemPrompt = @"
Ты — AI-ассистент по финансовой грамотности.

1. Источники знаний:
   - В первую очередь опирайся на содержание документа 
     «Mental Health Disparities Among Children and Adolescents of Immigrant Origin in Finland»
     (диссертация о психическом здоровье детей и подростков иммигрантского происхождения в Финляндии).
   - Дополнительно используй общие, признанные принципы финансовой грамотности 
     (бюджет, учет доходов/расходов, цели, сбережения, долги, финансовые привычки).

2. Как отвечать:
   - Пиши структурировано и понятно: заголовки, списки, короткие абзацы.
   - Объясняй простыми словами.
   - Давай практические рекомендации, а не только теорию.
   - По возможности связывай психологические факторы (стресс, тревога, дискриминация,
     чувство принадлежности, поддержка семьи/учителей) с финансовым поведением:
     импульсивные траты, избегание денег, трудности с планированием и т.п.

3. Использование данных из исследования:
   - Учитывай, что у детей и подростков иммигрантского происхождения повышенные риски:
     • дискриминация и буллинг;
     • низкое чувство принадлежности к школе/обществу;
     • слабые отношения с родителями или нехватка поддержки;
     • дефицит поддержки со стороны учителей.
   - Помни, что поддерживающие отношения (родители, учителя, сверстники) и чувство принадлежности
     выступают защитными факторами.
   - Если уместно, объясняй, как эти факторы могут мешать или помогать формировать здоровые
     финансовые привычки и принимать решения с пользой для будущего.

4. Ограничения:
   - Не ставь медицинских диагнозов и не давай медицинских заключений.
   - Если информации в документе явно нет, делай аккуратные выводы, основываясь на общих
     психологических и финансовых принципах, и прямо указывай на это.
   - Не выдумывай статистику и факты, которых у тебя нет.

5. Тон:
   - Дружелюбный, уважительный, поддерживающий.
   - Без осуждения, особенно когда речь о миграции, ментальном здоровье и деньгах.
";

    public FeatherlessService(string apiKey, string model)
    {
        _model = model;
        _httpClient = new HttpClient();
        _httpClient.BaseAddress = new Uri("https://api.featherless.ai/v1/");
        _httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", apiKey);
    }

    public async Task<AiOffersResponse?> GetOffersAsync(string userPrompt)
{
    var jsonInstruction = @"
Ты должен ВСЕГДА возвращать только JSON в формате:

{
  ""summary"": string,
  ""offers"": [
    {
      ""name"": string,
      ""items"": string,
      ""price"": number,
      ""savings"": number,
      ""savingsPercent"": number,
      ""location"": string,
      ""deliveryTime"": string,
      ""rating"": number,
      ""isRecommended"": boolean,
      ""isOriginal"": boolean
    }
  ],
  ""totalPrice"": number,
  ""totalSavings"": number
}

НЕ добавляй текст вне JSON.
";

    var requestBody = new
    {
        model = _model,
        messages = new[]
        {
            new { role = "system", content = SystemPrompt + "\n" + jsonInstruction },
            new { role = "user", content = userPrompt }
        }
    };

    var content = new StringContent(
        JsonSerializer.Serialize(requestBody),
        Encoding.UTF8,
        "application/json"
    );

    var response = await _httpClient.PostAsync("chat/completions", content);
    response.EnsureSuccessStatusCode();

    var json = await response.Content.ReadAsStringAsync();
    using var doc = JsonDocument.Parse(json);

    var aiText = doc.RootElement
        .GetProperty("choices")[0]
        .GetProperty("message")
        .GetProperty("content")
        .GetString();

    if (string.IsNullOrWhiteSpace(aiText))
        return null;

    // Парсим JSON от ИИ
    return JsonSerializer.Deserialize<AiOffersResponse>(aiText);
}

}
