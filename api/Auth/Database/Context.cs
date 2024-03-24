using Microsoft.EntityFrameworkCore;

namespace Auth.Database;

public class Context(DbContextOptions<Context> options) : DbContext(options)
{
    public DbSet<Model.User> Users { get; set; }
    public DbSet<Model.Role> Roles { get; set; }
}