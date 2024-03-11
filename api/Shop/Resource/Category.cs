namespace Shop.Resource;

public class Category
{
    public uint ID { get; set; }
    public string Name { get; set; }

    public static ICollection<Resource.Category> fromCollection(ICollection<Model.Category> categories)
    {
        return categories.Select(from).ToList();
    }

    public static Resource.Category from(Model.Category category)
    {
        return new Resource.Category
        {
            ID = category.ID,
            Name = category.Name
        };
    }
}