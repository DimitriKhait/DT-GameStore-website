using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Genre
    {
        public Genre()
        {
            Games = new HashSet<Game>();
        }

        public int Id { get; set; }
        public string? GenreName { get; set; }

        public virtual ICollection<Game> Games { get; set; }
    }
}
