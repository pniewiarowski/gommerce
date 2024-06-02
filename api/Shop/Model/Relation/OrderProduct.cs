using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Model.Relation;

public class OrderProduct
{
    [Key] public uint ID { get; set; }
    [ForeignKey("Order")] public uint OrderID { get; set; }
    [ForeignKey("Product")] public uint ProductID { get; set; }
    public Order? Order { get; set; }
    public Product? Product { get; set; }
}