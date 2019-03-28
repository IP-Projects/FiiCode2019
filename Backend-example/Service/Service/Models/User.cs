using System;
using System.Collections.Generic;

namespace Service.Models
{
    public partial class User
    {
        public User()
        {
            Collection = new HashSet<Collection>();
        }

        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public ICollection<Collection> Collection { get; set; }
    }
}
