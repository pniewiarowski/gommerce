namespace Auth.Resource;

public class Role
{
    public uint ID { get; set; }
    public string Name { get; set; }

    public static ICollection<Resource.Role> FromCollection(ICollection<Model.Role> roles)
    {
        return roles.Select(From).ToList();
    }

    public static Resource.Role From(Model.Role role)
    {
        return new Resource.Role
        {
            ID = role.ID,
            Name = role.Name,
        };
    }
}