using MongoDB.Bson;
using MongoDB.Driver;
using TestApi.Models;

namespace TestApi.Services;

public class MongoDbService
{
    private readonly IMongoDatabase? _database;
    private readonly bool _mongoAvailable;

    public IMongoCollection<ChatMessage>? ChatMessages { get; }
    public IMongoCollection<PersonModel>? Persons { get; }

    public MongoDbService(IConfiguration config)
    {
        try
        {
            var connectionString = config["MongoDb:ConnectionString"];
            var databaseName = config["MongoDb:DatabaseName"];

            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);

            EnsureCollectionExists("ChatMessages");
            EnsureCollectionExists("Persons");

            ChatMessages = _database.GetCollection<ChatMessage>("ChatMessages");
            Persons = _database.GetCollection<PersonModel>("Persons");

            _mongoAvailable = true;
            Console.WriteLine("MongoDB connected successfully.");
        }
        catch (Exception ex)
        {
            Console.WriteLine("⚠️ MongoDB connection FAILED: " + ex.Message);
            _mongoAvailable = false;

            ChatMessages = null;
            Persons = null;
        }
    }

    private void EnsureCollectionExists(string name)
    {
        if (!_mongoAvailable) return;

        var filter = new BsonDocument("name", name);
        var collections = _database!.ListCollections(new ListCollectionsOptions { Filter = filter });

        if (!collections.Any())
            _database.CreateCollection(name);
    }

    // ----- SAFE MODE: no crash -----
    public async Task InsertChatAsync(string prompt, string response)
    {
        if (!_mongoAvailable || ChatMessages == null)
            return;

        var message = new ChatMessage
        {
            Prompt = prompt,
            Response = response,
            CreatedAt = DateTime.UtcNow
        };

        try
        {
            await ChatMessages.InsertOneAsync(message);
        }
        catch (Exception ex)
        {
            Console.WriteLine("⚠️ Mongo insert failed: " + ex.Message);
        }
    }

    public async Task<List<ChatMessage>> GetChatHistoryAsync(int limit = 50)
    {
        if (!_mongoAvailable || ChatMessages == null)
            return new List<ChatMessage>(); // safe fallback

        return await ChatMessages
            .Find(_ => true)
            .SortByDescending(m => m.CreatedAt)
            .Limit(limit)
            .ToListAsync();
    }
}
