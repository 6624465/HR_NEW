using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HR.Models
{
    public class EmployeeViewModel
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeId { get; set; }
        public DateTime JoiningDate { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public DateTime DOB { get; set; }
        public string CountryCode { get; set; }
        public int EmployeeType { get; set; }
        public int Designation { get; set; }
        public int CountryId { get; set; }
        public string DesignationName { get; set; }
    }
}

