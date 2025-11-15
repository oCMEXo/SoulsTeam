using TestApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Featherless
string featherlessApiKey = builder.Configuration["Featherless:ApiKey"] ?? "";
string model = builder.Configuration["Featherless:Model"] ?? "";

builder.Services.AddSingleton<FeatherlessService>(sp =>
{
    var logger = sp.GetRequiredService<ILogger<FeatherlessService>>();
    return new FeatherlessService(featherlessApiKey, model, logger);
});

// Mongo
builder.Services.AddSingleton<MongoDbService>();
builder.Services.AddSingleton<PersonService>();

// CORS (на будущее, если фронт будет на другом домене)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policyBuilder =>
    {
        policyBuilder
            .WithOrigins(
                "http://localhost:3000",
                "https://localhost:3000",
                "http://localhost:3001",
                "https://localhost:3001",
                "http://localhost:5173",
                "https://localhost:5173",
                "http://localhost:8080",
                "https://soulsteam-576376474100.europe-west1.run.app"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ✅ Swagger и в Dev, и в Prod (Cloud Run)
app.UseSwagger();
app.UseSwaggerUI();

// ✅ Cloud Run порт
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Urls.Add($"http://0.0.0.0:{port}");

// 🔥 Порядок middleware

// В Cloud Run HTTPS делает прокси, редирект можно убрать,
// чтобы не ловить странные эффекты
// app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowFrontend");
app.UseAuthorization();

// ✅ Статика фронта (Vite билд лежит в wwwroot)
app.UseDefaultFiles();  // ищет index.html по умолчанию
app.UseStaticFiles();   // раздаёт файлы из wwwroot

// ✅ Контроллеры API
app.MapControllers();

// ✅ SPA фоллбек: всё, что не /api и не /swagger, -> index.html
app.MapFallbackToFile("index.html");

// ❌ Старый root-эндпоинт больше не нужен,
// потому что корень теперь отдаёт фронт
// app.MapGet("/", () => Results.Ok("API is running"));

app.Run();
