using System;
using System.Collections.Generic;

namespace Service.Models
{
    public partial class EntityFile
    {
        public Guid Id { get; set; }
        public string Extension { get; set; }
        public Guid PlaceholderId { get; set; }
        public string Data { get; set; }
        public bool IsUrl { get; set; }

        public Placeholder Placeholder { get; set; }
    }
}
