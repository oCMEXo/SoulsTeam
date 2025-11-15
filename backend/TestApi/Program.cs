using TestApi.Services;

var builder = WebApplication.CreateBuilder(args);

// ===== LOGGING =====
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// ===== FEATHERLESS =====
string featherlessApiKey = builder.Configuration["Featherless:ApiKey"]!;
string model = builder.Configuration["Featherless:Model"]!;

// ИСПРАВЛЕНО: Правильная регистрация с ILogger
builder.Services.AddSingleton<FeatherlessService>(serviceProvider =>
{
    var logger = serviceProvider.GetRequiredService<ILogger<FeatherlessService>>();
    return new FeatherlessService(featherlessApiKey, model, logger);
});

// ===== MONGO =====
builder.Services.AddSingleton<MongoDbService>();
builder.Services.AddSingleton<PersonService>();

// ===== CORS =====
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:3000", "http://localhost:5173","http://localhost:3001") // Добавлен порт Vite
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // Добавлен Swagger для тестирования API

var app = builder.Build();

// ===== SWAGGER (только в Development) =====
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ===== ENABLE CORS =====
app.UseCors("AllowFrontend");

// Отключаем HTTPS redirect, чтобы браузер не ругался
// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
///nice