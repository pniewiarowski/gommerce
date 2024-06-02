using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Model;

public class Product
{
    [Key] public uint ID { get; set; }
    [Required] public string Name { get; set; }
    [MinLength(3)] public string Description { get; set; }
    [Required] public float Price { get; set; }
    public bool Enabled { get; set; } = false;
    public int SortOrder { get; set; }
    [ForeignKey("Product")] public uint CategoryID { get; set; }
}