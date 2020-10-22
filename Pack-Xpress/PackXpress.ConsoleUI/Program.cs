using DataAccessLayer.Models;
using Infosys.PackXpress.DAL;
using Infosys.PackXpress.DAL.Models;
using System;
using System.Collections.Generic;

namespace Infosys.PackXpress.ConsoleUI
{
    class Program
    {
        static void Main(string[] args)
        {

            //Console.WriteLine("Hello World!");
            Repository repository = new Repository();
            //int res = repository.CheckAvailability(201011, 110022);
            //Console.WriteLine(res);


            //ADD CUSTOMER
            //int result = repository.AddCustomer("Sambhav", "sambhav@gmail.com", "127377379", 9788172373, "5", "6", "Krishna Nagar", 109881);
            //Console.WriteLine(result);
            //if (result > 0)
            //{
            //    Console.WriteLine("Customer added successfully");
            //}
            //else
            //{
            //    Console.WriteLine("Some error occurred. Try again!");
            //}

            //ADD PACKAGE
            //int result = repository.AddPackage(1, "Perishable", 10, 4, 5, 3, true, "Express", DateTime.Now.Date, "10, 2, Surya Nagar, U.P 201011", "4", "2", "Bangalore, Karnataka", 560087, 8722457632);
            //Console.WriteLine(result);
            //if (result > 0)
            //{
            //    Console.WriteLine("Package added successfully");
            //}
            //else
            //{
            //    Console.WriteLine("Some error occurred. Try again!");
            //}

            //UPDATE STATUS
            //int result = repository.UpdateStatus(12345678901, "FAILED");
            //Console.WriteLine(result);
            //if (result > 0)
            //{
            //    Console.WriteLine("Customer added successfully");
            //}
            //else
            //{
            //    Console.WriteLine("Some error occurred. Try again!");
            //}

            //Get Customer
            List<Customer> ans = repository.GetCustomers("Ankit");
            foreach (var i in ans)
            {
                Console.WriteLine(i.EmailId);
            }

            //TRACK PACKAGE

            //var reslt = repository.TrackPackage(12345678901);
            //Console.WriteLine("{0, -15}{1, -30}{2, -30}{3}", "AWBNumber", "SourceAddress", "DestinationAddress", "Status");
            //Console.WriteLine("-------------------------------------------------------------------------------------------");
            //if (reslt.Count == 0)
            //{
            //    Console.WriteLine("No products available under the given category!");
            //}
            //else
            //{
            //    foreach (var package in reslt)
            //    {
            //        Console.WriteLine("{0, -15}{1, -30}{2, -30}{3}", package.AWBNumber, package.SourceAddress, package.DestinationAddress, package.Status);
            //    }
            //}


            //PACKAGE HISTORY
            //    var result = repository.GetPackageHistory(1);
            //    Console.WriteLine("{0, -15}{1, -30}{2, -30}{3}", "AWBNumber", "SourceAddress", "DestinationAddress", "Status");
            //    Console.WriteLine("-------------------------------------------------------------------------------------------");
            //    if (result.Count == 0)
            //    {
            //        Console.WriteLine("No products available under the given category!");
            //    }
            //    else
            //    {
            //        foreach (var package in result)
            //        {
            //            Console.WriteLine("{0, -15}{1, -30}{2, -30}{3}", package.AWBNumber, package.SourceAddress, package.DestinationAddress, package.Status);
            //        }
            //    }
            //}
        }

    }
}
