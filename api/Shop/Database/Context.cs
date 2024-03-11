using Microsoft.EntityFrameworkCore;
using Shop.Model;
using Category = Shop.Resource.Category;

namespace Shop.Database;

public class Context(DbContextOptions<Context> options) : DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
}