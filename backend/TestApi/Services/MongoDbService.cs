using MongoDB.Bson;
using MongoDB.Driver;

namespace TestApi.Services;

public class MongoDbService
{
    private readonly IMongoCollection<BsonDocument> _collection;

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
        _collection = database.GetCollection<BsonDocument>(collectionName);
    }

    public async Task InsertChatAsync(string prompt, string response)
    {
        var doc = new BsonDocument
        {
            { "prompt", prompt },
            { "response", response },
            { "createdAt", DateTime.UtcNow }
        };

        await _collection.InsertOneAsync(doc);
    }

    public async Task<List<BsonDocument>> GetChatHistoryAsync(int limit = 50)
    {
        return await _collection
            .Find(new BsonDocument())
            .Sort(Builders<BsonDocument>.Sort.Descending("createdAt"))
            .Limit(limit)
            .ToListAsync();
    }
}
