using WebAPI.Models;
using WebAPI.Repositories;

namespace WebAPI.Services;

public class UserService(UserRepository repository)
{
    private readonly UserRepository _repository = repository;
    
    public Task<List<User>> GetAll() => _repository.GetAllAsync();

    public async Task<User?> GetById(int id) => await _repository.GetByIdAsync(id);

    public Task Add(User user) => _repository.AddAsync(user);

    public Task Update(User user) => _repository.UpdateAsync(user);

    public Task Delete(int id) => _repository.DeleteAsync(id);
}

