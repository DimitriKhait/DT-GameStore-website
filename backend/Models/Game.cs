using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Game
    {
        public Game()
        {
            GamePublishers = new HashSet<GamePublisher>();
        }

        public int Id { get; set; }
        public int? GenreId { get; set; }
        public string? GameName { get; set; }
        public double? Price { get; set; }
        public string? GameDescription { get; set; }
        public string? PicUrl { get; set; }

        public virtual Genre? Genre { get; set; }
        public virtual ICollection<GamePublisher> GamePublishers { get; set; }
    }
}
