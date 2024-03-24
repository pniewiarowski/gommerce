using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auth.Model;

public class User
{
    [Key] public uint ID { get; set; }
    [Required] public string Email { get; set; }
    [Required] public string Password { get; set; }
    [ForeignKey("Role")] public uint RoleID { get; set; }
}