﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HR.Models
{
    public class EmployeeViewModel
    {
        public string EmployeeName { get; set; }
        public int EmployeeId { get; set; }
        public DateTime JoiningDate { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public DateTime DOB { get; set; }
        public string CountryCode { get; set; }
        public int Designation { get; set; }
    }
}

