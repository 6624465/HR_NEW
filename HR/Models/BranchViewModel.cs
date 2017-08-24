using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HR.ViewModels
{
    public class BranchViewModel
    {
        public int Id { get; set; }
        public int BranchID { get; set; }
        public int CompanyId { get; set; }
        public string BranchCode { get; set; }
        public string BranchName { get; set; }
        public string RegNo { get; set; }
        public bool IsActive { get; set; }
        public string CompanyCode { get; set; }
        public int AddressID { get; set; }
        public AddressViewModel Address { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        
    }
}