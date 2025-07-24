using WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
}