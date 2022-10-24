using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Publisher
    {
        public Publisher()
        {
            GamePublishers = new HashSet<GamePublisher>();
        }

        public int Id { get; set; }
        public string? PublisherName { get; set; }

        public virtual ICollection<GamePublisher> GamePublishers { get; set; }
    }
}
