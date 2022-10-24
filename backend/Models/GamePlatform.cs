using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class GamePlatform
    {
        public GamePlatform()
        {
            AppUserGamePlatforms = new HashSet<AppUserGamePlatform>();
        }

        public int Id { get; set; }
        public int? GamePublisherId { get; set; }
        public int? PlatformId { get; set; }
        public int? ReleaseYear { get; set; }

        public virtual GamePublisher? GamePublisher { get; set; }
        public virtual Platform? Platform { get; set; }
        public virtual ICollection<AppUserGamePlatform> AppUserGamePlatforms { get; set; }
    }
}
