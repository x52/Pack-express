using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace ServiceLayer.Models
{
    public class Package
    {
        [Required]
        public int CustId { get; set; }
        [Required]
        public string ShipmentType { get; set; }
        public int Length { get; set; }
        [Required]
        public int Breadth { get; set; }
        [Required]
        public int Height { get; set; }
        [Required]
        public int Weight { get; set; }
        [Required]
        public bool Packaging { get; set; }
        [Required]
        public string DeliveryOption { get; set; }
        [Required]
        public DateTime PickupTime { get; set; }
        [Required]
        public string SourceAddress { get; set; }
        [Required]
        public string BuildingNo { get; set; }
        [Required]
        public string StreetNo { get; set; }
        [Required]
        public string Locality { get; set; }
        [Required]
        public int Pincode { get; set; }
        [Required]
        public long ContactNo { get; set; }

    }
}
