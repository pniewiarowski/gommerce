using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auth.Model;

public class User
{
    [Key] public uint ID { get; set; }
    [Required] [MinLength(4)] public string Email { get; set; }
    [Required] [MinLength(8)] public string Password { get; set; }
    [ForeignKey("Role")] public uint RoleID { get; set; }
}