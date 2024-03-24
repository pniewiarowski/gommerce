using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Auth.Service.Implementation;

public class Hasher(string secret) : IHasher
{
    private byte[] _secret = Encoding.ASCII.GetBytes(secret);

    public string From(string from) => Convert.ToBase64String(
        KeyDerivation.Pbkdf2(
            password: from,
            salt: _secret,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8
        )
    );

    public bool Compare(string compare, string hash) => From(compare) == hash;
}