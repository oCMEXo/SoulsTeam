using TestApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Featherless
string featherlessApiKey = builder.Configuration["Featherless:ApiKey"]!;
string model = builder.Configuration["Featherless:Model"]!;

builder.Services.AddSingleton<FeatherlessService>(sp =>
{
    var logger = sp.GetRequiredService<ILogger<FeatherlessService>>();
    return new FeatherlessService(featherlessApiKey, model, logger);
});

// Mongo
builder.Services.AddSingleton<MongoDbService>();
builder.Services.AddSingleton<PersonService>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder
            .WithOrigins(
                "http://localhost:3000",
                "https://localhost:3000",
                "http://localhost:3001",
                "https://localhost:3001",
                "http://localhost:5173",
                "https://localhost:5173",
                "http://localhost:8080"
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

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 🔥 Правильный порядок
app.UseHttpsRedirection();   // <-- нужно если фронт шлёт HTTPS
app.UseRouting();
app.UseCors("AllowFrontend");
app.UseAuthorization();

app.MapControllers();
app.Run();
