using System;
using System.Collections.Generic;

namespace Infosys.PackXpress.DAL.Models
{
    public partial class Address
    {
        public int AddressNo { get; set; }
        public string BuildingNo { get; set; }
        public string StreetNo { get; set; }
        public string Locality { get; set; }
        public decimal? Pincode { get; set; }
        public int CustId { get; set; }

        public virtual Customer Cust { get; set; }
    }
}
