using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Infosys.PackXpress.DAL.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Address = new HashSet<Address>();
            Package = new HashSet<Package>();
        }

        public int CustId { get; set; }
        public string Name { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public long ContactNo { get; set; }

        public virtual ICollection<Address> Address { get; set; }
        public virtual ICollection<Package> Package { get; set; }
    }
}
