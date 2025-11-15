using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TestApi.Models;

public class PersonModel
{
[BsonId]
[BsonRepresentation(BsonType.ObjectId)]
public string? Id { get; set; } // фронт Id НЕ отправляет

    [BsonElement("Email")]
    public string Email { get; set; }

    [BsonElement("Password")]
    public string Password { get; set; }
}
