using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ServiceLayer.Models
{
    public class Customer
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string EmailId { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public long ContactNo { get; set; }
        [Required]
        public string BuildingNo { get; set; }
        [Required]
        public string StreetNo { get; set; }
        [Required]
        public string Locality { get; set; }
        [Required]
        public int Pincode { get; set; }
    }
}
