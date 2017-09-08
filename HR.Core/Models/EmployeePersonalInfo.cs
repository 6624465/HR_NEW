﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Core.Models
{
    public class EmployeePersonalInfo
    {
        public int Id { get; set; }
        //public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public int BranchId { get; set; }
        public virtual Branch Branch { get; set; }
        public DateTime DOB { get; set; }
        public int Gender { get; set; }
        public int BirthCountry { get; set; }
        public int CitizenshipCountry { get; set; }
        public string FatherName { get; set; }
        public int MaritalStatus { get; set; }
        public string SpouseName { get; set; }
        public DateTime? MarriageDate { get; set; }
        public int ResidentialStatus { get; set; }
        public virtual Address Address { get; set; }
        [Required]
        public virtual EmployeeDocument EmployeeDocument { get; set; }
        [Required]
        public virtual EmployeeWorkDetail EmployeeWorkDetail { get; set; }


    }
}