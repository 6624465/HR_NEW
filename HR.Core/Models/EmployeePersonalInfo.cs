using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR.Core.Models
{
    public class EmployeePersonalInfo
    {
        public int Id { get; set; }
        //public int EmployeeId { get; set; }
       
        //public string EmployeeName { get; set; }
        public int BranchId { get; set; }
        //public virtual Branch Branch { get; set; }
        public int EmployeeHeaderId { get; set; }
        //public virtual EmployeeHeader EmployeeHeader { get; set; }

        public DateTime DOB { get; set; }
        public Int16 Gender { get; set; }
        public string BirthCountry { get; set; }
        public string CitizenshipCountry { get; set; }
        public string FatherName { get; set; }
        public int MaritalStatus { get; set; }
        public string SpouseName { get; set; }
        public DateTime? MarriageDate { get; set; }
        public Int16 ResidentialStatus { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string EmergencyContactNumber { get; set; }
        public string EmergencyContactName { get; set; }
    }
}
