using System;
using System.Collections.Generic;

namespace Infosys.PackXpress.DAL.Models
{
    public partial class Package
    {
        public long Awbnumber { get; set; }
        public int CustId { get; set; }
        public string ShipmentType { get; set; }
        public bool Packaging { get; set; }
        public string DeliveryOption { get; set; }
        public DateTime PickupTime { get; set; }
        public bool InsuranceApplied { get; set; }
        public string SourceAddress { get; set; }
        public string DestinationAddress { get; set; }
        public long ContactNo { get; set; }
        public decimal Cost { get; set; }
        public string Status { get; set; }

        public virtual Customer Cust { get; set; }
    }
}
