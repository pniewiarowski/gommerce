namespace Auth.Resource;

public class AuthResponse
{
    public uint ID { get; set; }
    public string Token { get; set; }
    public bool IsAdmin { get; set; }
}