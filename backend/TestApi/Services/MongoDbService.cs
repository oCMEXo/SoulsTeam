using MongoDB.Bson;
using MongoDB.Driver;
using TestApi.Models;

namespace TestApi.Services;

public class MongoDbService
{
    private readonly IMongoDatabase _database;

    public IMongoCollection<ChatMessage> ChatMessages { get; }
    public IMongoCollection<PersonModel> Persons { get; }

    public MongoDbService(IConfiguration config)
    {
        var connectionString = config["MongoDb:ConnectionString"]
            ?? throw new Exception("MongoDb:ConnectionString is not set");

        var databaseName = config["MongoDb:DatabaseName"]
            ?? throw new Exception("MongoDb:DatabaseName is not set");

        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);

        // Создание коллекций
        EnsureCollectionExists("ChatMessages");
        EnsureCollectionExists("Persons");

        ChatMessages = _database.GetCollection<ChatMessage>("ChatMessages");
        Persons = _database.GetCollection<PersonModel>("Persons");
    }

    private void EnsureCollectionExists(string name)
    {
        var filter = new BsonDocument("name", name);
        var collections = _database.ListCollections(new ListCollectionsOptions { Filter = filter });
        if (!collections.Any())
            _database.CreateCollection(name);
    }

    public async Task InsertChatAsync(string prompt, string response)
    {
        var message = new ChatMessage
        {
            Prompt = prompt,
            Response = response,
            CreatedAt = DateTime.UtcNow
        };

        await ChatMessages.InsertOneAsync(message);
    }
}
