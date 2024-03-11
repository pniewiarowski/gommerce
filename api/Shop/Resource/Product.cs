namespace Shop.Resource;

public class Product
{
    public uint ID { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public float Price { get; set; }
    public uint CategoryID { get; set; }

    public static ICollection<Resource.Product> FromCollection(ICollection<Model.Product> products)
    {
        return products.Select(From).ToList();
    }

    public static Resource.Product From(Model.Product product)
    {
        return new Resource.Product
        {
            ID = product.ID,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            CategoryID = product.CategoryID
        };
    }
}