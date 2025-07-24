using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using WebAPI.Services;
using WebAPI.Common;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(UserService service) : ControllerBase
{
    private readonly UserService _service = service;
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetAll() {
        var users = await _service.GetAll();
        return Ok(ApiResponse<IEnumerable<User>>.Ok(users));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<User?>> GetById(int id)
    {
        var user = await _service.GetById(id);
        return user != null 
            ? Ok(ApiResponse<User>.Ok(user))
            : NotFound(ApiResponse<User>.Fail("Usuário não encontrado"));
    }

    [HttpPost]
    public async Task<ActionResult<User>> Post(User user)
    {
        await _service.Add(user);
        return CreatedAtAction(nameof(GetById), new { id = user.Id }, ApiResponse<User>.Ok(user));
    }
    
    [HttpPut("{id:int}")]
    public async Task<ActionResult<User>> Update(int id, User user)
    {
        if (id != user.Id) 
            return BadRequest(ApiResponse<User>.Fail("O ID informado na URL não confere com o ID do usuário enviado."));
        
        var existing = await _service.GetById(user.Id);
        if (existing == null)
            return NotFound(ApiResponse<User>.Fail("Usuário não encontrado"));
        
        existing.Name = user.Name;
        existing.BirthDate = user.BirthDate;

        await _service.Update(existing);
        return Ok(ApiResponse<User>.Ok(existing, "Usuário atualizado com sucesso"));
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        var existing = await _service.GetById(id);
        if (existing == null)
            return NotFound(ApiResponse<User>.Fail("Usuário não encontrado"));

        await _service.Delete(id);
        return Ok(ApiResponse<string>.Ok("","Usuário excluído com sucesso  "));
    }
}