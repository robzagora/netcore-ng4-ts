namespace Dashboard.Library.ViewModels
{
    using System.ComponentModel.DataAnnotations;

    public class RegistrationViewModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        [MinLength(6)]
        [MaxLength(30)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        [MaxLength(30)]
        public string Password { get; set; }
    }
}