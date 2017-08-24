namespace HR.Core.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Master.Countries")]
    public class Country
    {
        [Key]
        [Column(Order = 0)]
        public int Id { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(2)]
        public string CountryCode { get; set; }

        [Required]
        [StringLength(255)]
        public string CountryName { get; set; }

        [Required]
        [StringLength(255)]
        public string Description { get; set; }
    }
}
