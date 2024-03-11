using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Shop.Model;

public class Order
{
    [Key] public uint ID { get; set; }
    public string Status { get; set; }
    [ForeignKey("Customer")] public uint CustomerID { get; set; }
    public ICollection<Product> Products { get; set; }
}