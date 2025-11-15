using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TestApi.Models;

public class ChatMessage
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("Prompt")]
    public string Prompt { get; set; }

    [BsonElement("Response")]
    public string Response { get; set; }

    [BsonElement("CreatedAt")]
    public DateTime CreatedAt { get; set; }
}
