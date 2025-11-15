
 using TestApi.Services;

 var builder = WebApplication.CreateBuilder(args);

 string featherlessApiKey = builder.Configuration["Featherless:ApiKey"]!;
 string model = builder.Configuration["Featherless:Model"]!;

 builder.Services.AddSingleton(new FeatherlessService(featherlessApiKey, model));
 builder.Services.AddSingleton<MongoDbService>();
 builder.Services.AddSingleton<PersonService>();

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
