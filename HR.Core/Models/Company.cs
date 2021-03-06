namespace HR.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Web.Script.Serialization;
    [Table("Master.Companies")]
    public class Company
    {

        //public Company()
        //{
        //    this.Branches = new HashSet<Branch>();
        //}
        public int Id { get; set; }
        public string CompanyCode { get; set; }
        public string CompanyName { get; set; }
        public string RegNo { get; set; }
        public byte[] Logo { get; set; }
        public bool IsActive { get; set; }
        public int AddressID { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public System.DateTime? InCorporationDate { get; set; }
        public virtual Address Address { get; set; }
        [ScriptIgnore(ApplyToOverrides = true)]
        public virtual ICollection<Branch> Branches { get; set; }
    }
}
