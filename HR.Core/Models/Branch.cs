namespace HR.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Master.Branches")]
    public class Branch
    {
        public int BranchID { get; set; }
        public string BranchCode { get; set; }
        public string BranchName { get; set; }
        public string RegNo { get; set; }
        public bool IsActive { get; set; }
        public string CompanyCode { get; set; }
        public int? AddressID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public int CompanyId { get; set; }
        public virtual Company Companies { get; set; }
        public virtual Address Address { get; set; }

    }
}
