namespace Auth.Service;

public interface IHasher
{
    public string From(string from);
    public bool Compare(string compare, string hash);
}