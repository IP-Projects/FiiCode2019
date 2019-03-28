using System;
using System.Collections.Generic;

namespace Service.Models
{
    public partial class Placeholder
    {
        public Placeholder()
        {
            EntityFile = new HashSet<EntityFile>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Keywords { get; set; }
        public Guid CollectionId { get; set; }
        public string Data { get; set; }
        public string Extension { get; set; }


        public Collection Collection { get; set; }
        public ICollection<EntityFile> EntityFile { get; set; }
    }
}
