using Microsoft.EntityFrameworkCore;

namespace Shop.Database;

public class Context(DbContextOptions<Context> options) : DbContext(options)
{
    public DbSet<Model.Product> Products { get; set; }
    public DbSet<Model.Category> Categories { get; set; }
    public DbSet<Model.Customer> Customers { get; set; }
    public DbSet<Model.Order> Orders { get; set; }
}