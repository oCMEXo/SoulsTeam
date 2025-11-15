using TestApi.Services;

var builder = WebApplication.CreateBuilder(args);

// ===== FEATHERLESS =====
string featherlessApiKey = builder.Configuration["Featherless:ApiKey"]!;
string model = builder.Configuration["Featherless:Model"]!;

builder.Services.AddSingleton(new FeatherlessService(featherlessApiKey, model));

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
                .WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ===== ENABLE CORS =====
app.UseCors("AllowFrontend");

// Swagger only for dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Отключаем HTTPS redirect, чтобы браузер не ругался
// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
