namespace HR.Data
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Security.Users")]
    public partial class User
    {
        [StringLength(25)]
        public string UserID { get; set; }

        [Required]
        [StringLength(100)]
        public string UserName { get; set; }

        [Required]
        [StringLength(15)]
        public string Password { get; set; }

        public bool IsActive { get; set; }

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(10)]
        public string MobileNumber { get; set; }

        [Required]
        [StringLength(20)]
        public string RoleCode { get; set; }

        public int BranchId { get; set; }

        [Required]
        [StringLength(25)]
        public string CreatedBy { get; set; }

        public DateTime CreatedOn { get; set; }

        [StringLength(25)]
        public string ModifiedBy { get; set; }

        public DateTime? ModifiedOn { get; set; }
    }
}
