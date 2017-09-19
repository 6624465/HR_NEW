using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HR.Core.Models
{
   public class EmployeeHeader
    {
        //public int Id { get; set; }
        [Key]
        public int Id { get; set; }
        public int BranchId { get; set; }
        //public virtual Branch Branch { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Nationality{ get; set; }
        public int IDType { get; set; }
        public string IDNumber { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int AddressId { get; set; }
        public virtual Address Address { get; set; }
        public int EmployeePersonalInfoId { get; set; }
        public virtual EmployeePersonalInfo EmployeePersonalInfo { get; set; }
        public int EmployeeWorkDetailId { get; set; }
        public virtual EmployeeWorkDetail EmployeeWorkDetail { get; set; }
        public int  UserId { get; set; }
        public  virtual User User  { get; set; }
        public string UserEmailId { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public bool IsActive { get; set; }
    }
}
