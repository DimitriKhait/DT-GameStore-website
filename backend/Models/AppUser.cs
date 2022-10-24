using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class AppUser
    {
        public AppUser()
        {
            AppUserGamePlatforms = new HashSet<AppUserGamePlatform>();
        }

        public int Id { get; set; }
        public string? Fname { get; set; }
        public string? Lname { get; set; }
        public string? Email { get; set; }
        public string? Pwd { get; set; }
        public string? Birthdate { get; set; }
        public string? Gender { get; set; }
        public string? MobilePhone { get; set; }

        public virtual ICollection<AppUserGamePlatform> AppUserGamePlatforms { get; set; }
    }
}
