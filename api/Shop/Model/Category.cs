using System.ComponentModel.DataAnnotations;

namespace Shop.Model;

public class Category
{
    [Key] public uint ID { get; set; }
    [Required] public string Name { get; set; }
    public ICollection<Product> Products { get; set; }
}