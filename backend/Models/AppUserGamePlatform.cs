using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class AppUserGamePlatform
    {
        public int Id { get; set; }
        public int? AppUserId { get; set; }
        public int? GamePlatformId { get; set; }

        public virtual AppUser? AppUser { get; set; }
        public virtual GamePlatform? GamePlatform { get; set; }
    }
}
