namespace HR.Core.Models
{

    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    [Table("[Security].[Roles]")]
    public  class Role
    {
        [Key]
        public int Id { set; get; }
        public string RoleCode { get; set; }
        public string RoleDescription { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}
