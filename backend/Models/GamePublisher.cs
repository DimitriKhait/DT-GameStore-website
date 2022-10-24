using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class GamePublisher
    {
        public GamePublisher()
        {
            GamePlatforms = new HashSet<GamePlatform>();
        }

        public int Id { get; set; }
        public int? GameId { get; set; }
        public int? PublisherId { get; set; }

        public virtual Game? Game { get; set; }
        public virtual Publisher? Publisher { get; set; }
        public virtual ICollection<GamePlatform> GamePlatforms { get; set; }
    }
}
