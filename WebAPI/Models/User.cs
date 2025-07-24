using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models;

public class User {
    public int Id { get; set; }
    
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Name { get; set; } = string.Empty;
    
    [Required]
    public DateTime BirthDate { get; set; }
}
