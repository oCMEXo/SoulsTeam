using MongoDB.Driver;
using TestApi.Models;

namespace TestApi.Services;

public class PersonService
{
    private readonly IMongoCollection<PersonModel> _collection;

    public PersonService(MongoDbService mongo)
    {
        _collection = mongo.Persons;
    }

    public async Task<PersonModel> CreateAsync(PersonModel person)
    {
        await _collection.InsertOneAsync(person);
        return person;
    }

    public async Task<List<PersonModel>> GetAllAsync()
    {
        return await _collection.Find(_ => true).ToListAsync();
    }

    public async Task<PersonModel?> GetByIdAsync(string id)
    {
        return await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();
    }
}
