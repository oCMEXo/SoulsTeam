using TestApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Чтение API key и модели из конфигурации
string featherlessApiKey = builder.Configuration["Featherless:ApiKey"];
string model = builder.Configuration["Featherless:Model"];

// Регистрируем сервисы
builder.Services.AddSingleton(new FeatherlessService(featherlessApiKey, model));
builder.Services.AddSingleton<MongoDbService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
