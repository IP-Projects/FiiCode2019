using System;
using System.Collections.Generic;

namespace Service.Models
{
    public partial class Collection
    {
        public Collection()
        {
            Placeholder = new HashSet<Placeholder>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public byte Type { get; set; }
        public string Keywords { get; set; }
        public Guid UserId { get; set; }

        public User User { get; set; }
        public ICollection<Placeholder> Placeholder { get; set; }
    }
}
