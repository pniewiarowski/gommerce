using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Auth.Service.Implementation;

public class Token(string secret) : IToken
{
    public string Generate(
        uint ID,
        string Email,
        uint RoleID,
        int expiryMinutes = 60
    )
    {
        var claims = new List<Claim>
        {
            new Claim("id", ID.ToString()),
            new Claim(ClaimTypes.Email, Email),
            new Claim("role", RoleID.ToString()),
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(expiryMinutes),
            SigningCredentials =
                new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwt = tokenHandler.WriteToken(token);

        return jwt;
    }
}