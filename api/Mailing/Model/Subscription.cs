using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mailing.Model;

public class Subscription
{
    [Key] public uint ID { get; set; }
    [ForeignKey("User")] public uint UserID { get; set; }
}