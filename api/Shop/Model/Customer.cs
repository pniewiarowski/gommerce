using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Model;

public class Customer
{
    [Key] public uint ID { get; set; }
    [Required] [MinLength(3)] public string FirstName { get; set; }
    [Required] [MinLength(3)] public string LastName { get; set; }
    [Required] public bool IsActive { get; set; } = true;
    [ForeignKey("User")] public uint UserID { get; set; }
    public ICollection<Order> Orders { get; set; }
}