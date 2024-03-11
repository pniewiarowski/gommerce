using System.ComponentModel.DataAnnotations;

namespace Shop.Model;

public class Customer
{
    [Key] public uint ID { get; set; }
    [Required] public string FirstName { get; set; }
    [Required] public string LastName { get; set; }
    [Required] public string Email { get; set; }
    [Required] public string Password { get; set; }
    public ICollection<Order> Orders { get; set; }
}