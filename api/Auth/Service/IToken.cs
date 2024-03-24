namespace Auth.Service;

public interface IToken
{
    public string Generate(
        uint ID,
        string Email,
        uint RoleID,
        int expiryMinutes = 60
    );
}