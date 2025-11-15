using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TestApi.Models;

public class PersonModel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("email")]
    public string Email { get; set; }

    [BsonElement("password")]
    public string Password { get; set; }
}
///Test if we will make data structure 