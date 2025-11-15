using MongoDB.Driver;
using TestApi.Models;


namespace TestApi.Services;

public class MongoDbService
{
    private readonly IMongoCollection<ChatMessage> _collection;

    public MongoDbService(IConfiguration config)
    {
        var connectionString = config["MongoDb:ConnectionString"]
            ?? throw new Exception("MongoDb:ConnectionString is not set");
        var databaseName = config["MongoDb:DatabaseName"]
            ?? throw new Exception("MongoDb:DatabaseName is not set");
        var collectionName = config["MongoDb:CollectionName"]
            ?? throw new Exception("MongoDb:CollectionName is not set");

        var client = new MongoClient(connectionString);
        var database = client.GetDatabase(databaseName);
        _collection = database.GetCollection<ChatMessage>(collectionName);
    }

    public async Task InsertChatAsync(string prompt, string response)
    {
        var message = new ChatMessage
        {
            Prompt = prompt,
            Response = response,
            CreatedAt = DateTime.UtcNow
        };

        await _collection.InsertOneAsync(message);
    }

    public async Task<List<ChatMessage>> GetChatHistoryAsync(int limit = 50)
    {
        return await _collection
            .Find(_ => true)
            .SortByDescending(m => m.CreatedAt)
            .Limit(limit)
            .ToListAsync();
    }
}