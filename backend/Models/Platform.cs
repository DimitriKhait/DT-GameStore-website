using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Platform
    {
        public Platform()
        {
            GamePlatforms = new HashSet<GamePlatform>();
        }

        public int Id { get; set; }
        public string? PlatformName { get; set; }

        public virtual ICollection<GamePlatform> GamePlatforms { get; set; }
    }
}
