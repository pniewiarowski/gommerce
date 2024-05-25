using Microsoft.EntityFrameworkCore;

namespace Mailing.Database;

public class Context(DbContextOptions<Context> options) : DbContext(options)
{
    
}