using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Repositories;

public class UserRepository(AppDbContext dbContext)
{
    private readonly AppDbContext _dbContext = dbContext;
    
    public async Task<List<User>> GetAllAsync() => 
        await _dbContext.Users.ToListAsync();
    
    public async Task<User?> GetByIdAsync(int id) => 
        await _dbContext.Users.FindAsync(id);

    public async Task AddAsync(User user)
    {
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task UpdateAsync(User user) {
        _dbContext.Users.Update(user);
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task DeleteAsync(int id) {
        var user = await _dbContext.Users.FindAsync(id);
        if (user != null) {
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
        }
    }
}