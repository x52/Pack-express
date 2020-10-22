using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using DataAccessLayer.Models;
using Infosys.PackXpress.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Infosys.PackXpress.DAL
{
    public class Repository
    {
        PackXprezContext context;
        public Repository()
        {
            context = new PackXprezContext();
        }

        public int AddCustomer(String Name, string EmailId, string Password, long ContactNo, string BuildingNo,
            string StreetNo, string Locality, int Pincode)
        {
            int result = 0;
            try
            {
                SqlParameter prmName = new SqlParameter("@Name", Name);
                SqlParameter prmEmailId = new SqlParameter("EmailId", EmailId);
                SqlParameter prmPassword = new SqlParameter("@Password", Password);
                SqlParameter prmContactNo = new SqlParameter("@ContactNo", ContactNo);
                SqlParameter prmBuildingNo = new SqlParameter("@BuildingNo", BuildingNo);
                SqlParameter prmStreetNo = new SqlParameter("@StreetNo", StreetNo);
                SqlParameter prmLocality = new SqlParameter("@Locality", Locality);
                SqlParameter prmPincode = new SqlParameter("@Pincode", Pincode);

                SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
                prmReturnResult.Direction = System.Data.ParameterDirection.Output;

                context.Database.ExecuteSqlCommand
                    ("EXEC @ReturnResult = usp_AddCustomer @Name, @EmailId, @Password, @ContactNo, @BuildingNo, @StreetNo, " +
                    "@Locality, @Pincode", new[]{prmReturnResult, prmName, prmEmailId, prmPassword, prmContactNo,
                        prmBuildingNo, prmStreetNo, prmLocality, prmPincode});

                result = Convert.ToInt32(prmReturnResult.Value);
            }
            catch (Exception e)
            {
                result = -99;
            }
            return result;
        }

        public List<Customer> GetCustomers(string name)
        {
            List<Customer> lstCustomers = null;
            try
            {
                lstCustomers = context.Customer.Where(p => p.Name == name).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                lstCustomers = null;
            }
            return lstCustomers;
        }

        public int AddAddress(string BuildingNo, string StreetNo, string Locality, int Pincode, int CustId)
        {
            int result = 0;
            try
            {
                SqlParameter prmBuildingNo = new SqlParameter("@BuildingNo", BuildingNo);
                SqlParameter prmStreetNo = new SqlParameter("@StreetNo", StreetNo);
                SqlParameter prmLocality = new SqlParameter("@Locality", Locality);
                SqlParameter prmPincode = new SqlParameter("@Pincode", Pincode);
                SqlParameter prmCustId = new SqlParameter("@CustId", CustId);

                SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
                prmReturnResult.Direction = System.Data.ParameterDirection.Output;

                context.Database.ExecuteSqlCommand
                    ("EXEC @ReturnResult = usp_AddAddress @BuildingNo, @StreetNo, @Locality, @Pincode, @CustId",
                    new[] { prmReturnResult, prmBuildingNo, prmStreetNo, prmLocality, prmPincode, prmCustId });

                result = Convert.ToInt32(prmReturnResult.Value);
            }
            catch (Exception)
            {

                result = 99;
            }
            return result;
        }

        public int ValidateCustomer(string EmailId, string Password)
        {
            int result = 0;
            try
            {
                SqlParameter prmEmailId = new SqlParameter("@EmailId", EmailId);
                SqlParameter prmPassword = new SqlParameter("@Password", Password);

                SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
                prmReturnResult.Direction = System.Data.ParameterDirection.Output;

                context.Database.ExecuteSqlCommand("EXEC @ReturnResult =[dbo].[usp_ValidateCustomer] @EmailId, @Password",
                     new[] { prmReturnResult, prmEmailId, prmPassword });

                result = Convert.ToInt32(prmReturnResult.Value);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                result = -99;
            }
            return result;
        }

        public int CheckAvailability(int SourcePincode, int DestinationPincode)
        {
            int result = 0;
            try
            {
                SqlParameter prmSourcePincode = new SqlParameter("@SourcePincode", SourcePincode);
                SqlParameter prmDestinationPincode = new SqlParameter("@DestinationPincode", DestinationPincode);

                SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
                prmReturnResult.Direction = System.Data.ParameterDirection.Output;

                context.Database.ExecuteSqlCommand("EXEC @ReturnResult = usp_CheckAvailability @SourcePincode, @DestinationPincode",
                    new[] { prmReturnResult, prmSourcePincode, prmDestinationPincode });

                result = Convert.ToInt32(prmReturnResult.Value);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                result = -99;
            }
            return result;
        }

        public int AddPackage(int CustId, string ShipmentType, int Length, int Breadth, int Height, int Weight,
            bool Packaging, string DeliveryOption, DateTime PickupTime, string SourceAddress, string BuildingNo,
            string StreetNo, string Locality, int Pincode, long ContactNo)
        {
            int result = 0;
            try
            {
                SqlParameter prmCustId = new SqlParameter("@CustId", CustId);
                SqlParameter prmShipmentType = new SqlParameter("@ShipmentType", ShipmentType);
                SqlParameter prmLength = new SqlParameter("@Length", Length);
                SqlParameter prmBreadth = new SqlParameter("@Breadth", Breadth);
                SqlParameter prmHeight = new SqlParameter("@Height", Height);
                SqlParameter prmWeight = new SqlParameter("@Weight", Weight);
                SqlParameter prmpackaging = new SqlParameter("@Packaging", Packaging);
                SqlParameter prmDeliveryOption = new SqlParameter("@DeliveryOption", DeliveryOption);
                SqlParameter prmPickupTime = new SqlParameter("@PickupTime", PickupTime);
                SqlParameter prmSourceAddress = new SqlParameter("@SourceAddress", SourceAddress);
                SqlParameter prmBuildingNo = new SqlParameter("@BuildingNo", BuildingNo);
                SqlParameter prmStreetNo = new SqlParameter("@StreetNo", StreetNo);
                SqlParameter prmLocality = new SqlParameter("@Locality", Locality);
                SqlParameter prmPincode = new SqlParameter("@Pincode", Pincode);
                SqlParameter prmContactNo = new SqlParameter("@ContactNo", ContactNo);

                SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
                prmReturnResult.Direction = System.Data.ParameterDirection.Output;

                context.Database.ExecuteSqlCommand
                    ($"EXEC @ReturnResult = dbo.usp_AddPackage @CustId, @ShipmentType, @Length, @Breadth, @Height, @Weight, @Packaging, @DeliveryOption, @PickupTime, @SourceAddress, @BuildingNo, @StreetNo, @Locality, @Pincode, @ContactNo", new[] { prmReturnResult, prmCustId, prmShipmentType, prmLength, prmBreadth, prmHeight, prmWeight, prmpackaging, prmDeliveryOption, prmPickupTime, prmSourceAddress, prmBuildingNo, prmStreetNo, prmLocality, prmPincode, prmContactNo });

                result = Convert.ToInt32(prmReturnResult.Value);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                result = -99;
            }
            return result;
        }


        public int UpdateStatus(long AWBNumber, string Status)
        {
            int result = 0;
            try
            {
                SqlParameter prmAWBNumber = new SqlParameter("@AWBNumber", AWBNumber);
                SqlParameter prmStatus = new SqlParameter("@Status", Status);

                SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
                prmReturnResult.Direction = System.Data.ParameterDirection.Output;

                context.Database.ExecuteSqlCommand("EXEC @ReturnResult=usp_UpdateStatus @AWBNumber, @Status",
                    new[] { prmReturnResult, prmAWBNumber, prmStatus });

                result = Convert.ToInt32(prmReturnResult.Value);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                result = -99;
            }
            return result;
        }

        public List<PackageTracking> TrackPackage(long AWBNumber)
        {
            List<PackageTracking> lstPackage = null;
            try
            {
                SqlParameter prmAWBNumber = new SqlParameter("@AWBNumber", AWBNumber);

                lstPackage = context.PackageTracking.FromSql($"SELECT * FROM dbo.ufn_TrackPackage(@AWBNumber)", prmAWBNumber).ToList();

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                lstPackage = null;
            }

            return lstPackage;
        }

        public List<PackageTracking> GetPackageHistory(int CustId)
        {
            List<PackageTracking> lstPackages = null;

            try
            {
                SqlParameter prmCustId = new SqlParameter("@CustId", CustId);

                lstPackages = context.PackageTracking.FromSql($"SELECT * FROM ufn_PackageHistory(@CustId)", prmCustId).ToList();
            }
            catch (Exception)
            {

                lstPackages = null;
            }
            return lstPackages;
        }
    }
}
