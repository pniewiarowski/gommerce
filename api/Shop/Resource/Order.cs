namespace Shop.Resource;

public class Order
{
    public uint ID { get; set; }
    public string Status { get; set; }
    public uint CustomerID { get; set; }

    public static ICollection<Resource.Order> FromCollection(ICollection<Model.Order> orders)
    {
        return orders.Select(From).ToList();
    }

    public static Resource.Order From(Model.Order order)
    {
        return new Resource.Order
        {
            ID = order.ID,
            Status = order.Status,
            CustomerID = order.CustomerID
        };
    }
}