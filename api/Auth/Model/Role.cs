using System.ComponentModel.DataAnnotations;

namespace Auth.Model;

public class Role
{
    [Key] public uint ID { get; set; }
    [Required] public string Name { get; set; }
}