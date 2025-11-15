using Microsoft.AspNetCore.Mvc;
using TestApi.Models;
using TestApi.Services;

namespace TestApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PersonController : ControllerBase
{
    private readonly PersonService _persons;

    public PersonController(PersonService persons)
    {
        _persons = persons;
    }

[HttpPost]
public async Task<IActionResult> Create(PersonModel person)
{
    person.Id = null; // ❗ обязательный фикс
    await _persons.CreateAsync(person);
    return Ok(person);
}


    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await _persons.GetAllAsync();
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var p = await _persons.GetByIdAsync(id);
        if (p == null)
            return NotFound();

        return Ok(p);
    }
}
