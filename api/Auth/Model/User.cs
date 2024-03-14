using System.ComponentModel.DataAnnotations;

namespace Auth.Model;

public class User
{
    [Key] public uint ID { get; set; }
    [Required] public string Name { get; set; }
    [Required] public string Email { get; set; }
    [Required] public string Password { get; set; }
    public bool IsAdmin { get; set; }
}
