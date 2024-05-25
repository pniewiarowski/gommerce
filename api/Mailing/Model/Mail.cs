using System.ComponentModel.DataAnnotations;

namespace Mailing.Model;

public class Mail
{
    [Key] public uint ID { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    [Required] public DateTime SentDate { get; set; }
}