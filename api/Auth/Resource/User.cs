using System.ComponentModel.DataAnnotations;

namespace Auth.Resource;

public class User
{
    public uint ID { get; set; }
    public string Email { get; set; }

    public static ICollection<Resource.User> FromCollection(ICollection<Model.User> users)
    {
        return users.Select(From).ToList();
    }

    public static Resource.User From(Model.User user)
    {
        return new Resource.User
        {
            ID = user.ID,
            Email = user.Email,
        };
    }
}