namespace Shop.Resource;

public class Customer
{
    public uint ID { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }

    public static ICollection<Resource.Customer> FromCollection(ICollection<Model.Customer> customers)
    {
        return customers.Select(From).ToList();
    }

    public static Resource.Customer From(Model.Customer customer)
    {
        return new Resource.Customer
        {
            ID = customer.ID,
            FirstName = customer.FirstName,
            LastName = customer.LastName,
            Email = customer.Email
        };
    }
}