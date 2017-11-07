namespace HR.Core.Models
{

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    [Table("[Security].[Securables]")]
    public class Securable
    {

        [Key]
        public int SecurableID { get; set; }
        public int RegistrationType_LookUpId { get; set; }
        public string PageID { get; set; }
        public string PageDescription { get; set; }
        public string OperationID { get; set; }
        public string OperationDescription { get; set; }
        public Int16 Type { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }
        public virtual LookUp RegistrationType { get; set; }
        public string RegistrationTypeDescription { get; set; }


    }
}