using TestApi.Services;

var builder = WebApplication.CreateBuilder(args);

// ===== LOGGING =====
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// ===== FEATHERLESS =====
string featherlessApiKey = builder.Configuration["Featherless:ApiKey"]!;
string model = builder.Configuration["Featherless:Model"]!;

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
                .WithOrigins(
                    "http://localhost:3000",
                    "http://localhost:5173",
                    "http://localhost:3001"
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

// ===== SWAGGER =====
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ===== MIDDLEWARE ORDER FIX =====
app.UseRouting();          // <---- ОБЯЗАТЕЛЬНО
app.UseCors("AllowFrontend"); 
app.UseAuthorization();

app.MapControllers();

app.Run();
