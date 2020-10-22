using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataAccessLayer;
using DataAccessLayer.Models;
using Infosys.PackXpress.DAL;
using Infosys.PackXpress.DAL.Models;
using System.ComponentModel.DataAnnotations;


namespace ServiceLayer.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MainController : Controller
    {
        Repository mainBL;
        public MainController()
        {
            mainBL = new Repository();
        }
        [HttpGet]
        public JsonResult GetCustomers()
        {
            List<Customer> customerList = null;
            try
            {
                customerList = mainBL.GetCustomers("Ashutosh");
            }
            catch (Exception)
            {
                customerList = null;
            }
            return Json(customerList);
        }

        [HttpGet]
        public int ValidateCustomer(string EmailId, string Password)
        {
            int status = 0;
            try
            {
                status = mainBL.ValidateCustomer(EmailId, Password);
            }
            catch (Exception)
            {

                status = -99;
            }
            return status;
        }

        [HttpGet]
        public int CheckAvailability(int SourcePincode, int DestinationPincode)
        {
            int status = 0;
            try
            {
                status = mainBL.CheckAvailability(SourcePincode, DestinationPincode);
            }
            catch (Exception)
            {
                status = -99;
            }
            return status;
        }


        [HttpGet]
        public JsonResult TrackPackage(long AWBNumber)
        {
            List<PackageTracking> details = null;
            try
            {
                details = mainBL.TrackPackage(AWBNumber);
            }
            catch (Exception)
            {
                details = null;
            }
            return Json(details);
        }

        [HttpGet]
        public JsonResult GetPackageHistory(int CustId)
        {
            List<PackageTracking> details = null;
            try
            {
                details = mainBL.GetPackageHistory(CustId);
            }
            catch (Exception)
            {
                details = null;
            }
            return Json(details);
        }

        [HttpPost]
        public int AddCustomer(Models.Customer cust)
        {
            int status = 0;
            try
            {
                status = mainBL.AddCustomer(cust.Name, cust.EmailId, cust.Password, cust.ContactNo, cust.BuildingNo, cust.StreetNo, cust.Locality, cust.Pincode);
            }
            catch (Exception)
            {

                status = -99;
            }
            return status;
        }

        [HttpPost]
        public int AddAddress( string BuildingNo, string StreetNo, string Locality, int Pincode, int Custid)
        {
            int status = 0;
            try
            {
                status = mainBL.AddAddress(BuildingNo, StreetNo, Locality, Pincode, Custid);
            }
            catch (Exception)
            {
                status = -99;
            }
            return status;
        }

        [HttpPost]
        public int AddPackage(Models.Package package)
        {
            int status = 0;
            try
            {
                status = mainBL.AddPackage(package.CustId, package.ShipmentType, package.Length,
                    package.Breadth, package.Height, package.Weight, package.Packaging,
                    package.DeliveryOption, package.PickupTime, package.SourceAddress,
                    package.BuildingNo, package.StreetNo, package.Locality, package.Pincode, package.ContactNo);
            }
            catch (Exception)
            {
                status = -99;

            }
            return status;
        }

        [HttpPut]
        public int UpdateStatus(long AWBNumber, string Status)
        {
            int status = 0;
            try
            {
                status = mainBL.UpdateStatus(AWBNumber, Status);
            }
            catch (Exception)
            {
                status = -99;
            }
            return status;
        }

    }
}