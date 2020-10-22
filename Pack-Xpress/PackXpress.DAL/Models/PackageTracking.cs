using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DataAccessLayer.Models
{
    public class PackageTracking
    {
        [Key]
        public long AWBNumber { get; set; }
        public string SourceAddress { get; set; }
        public string DestinationAddress { get; set; }
        public string Status { get; set; }
    }
}
