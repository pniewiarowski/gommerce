using System.ComponentModel.DataAnnotations;

namespace Shop.Model;

public class Category
{
    [Key] public uint ID { get; set; }
    [Required] public string Name { get; set; }
    [Required] public int SortOrder { get; set; } = 10;
    public string Description { get; set; }
    public bool Enabled { get; set; } = true;
    public ICollection<Product> Products { get; set; }
}