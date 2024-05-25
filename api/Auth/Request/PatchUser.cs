using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auth.Request;

public class PatchUser
{
    [Required] [MinLength(4)] public string? Email { get; set; }
    [Required] [MinLength(8)] public string? Password { get; set; }
}
