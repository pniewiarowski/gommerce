namespace Shop.Resource;

public class Category
{
    public uint ID { get; set; }
    public string Name { get; set; }

    public static ICollection<Resource.Category> FromCollection(ICollection<Model.Category> categories)
    {
        return categories.Select(From).ToList();
    }

    public static Resource.Category From(Model.Category category)
    {
        return new Resource.Category
        {
            ID = category.ID,
            Name = category.Name
        };
    }
}