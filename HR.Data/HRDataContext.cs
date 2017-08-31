namespace HR.Data
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using Core.Models;
    using HR.Core;
    public class HRDataContext : DbContext
    {
        public HRDataContext()
            : base("name=HRDataContext")
        {
        }

        public virtual DbSet<LookUp> LookUps { get; set; }
        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Branch> Branches { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<HolidayList> HolidayLists { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<EmployeeLeaveList> EmployeeLeaveLists { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LookUp>()
                .Property(e => e.LookUpCode)
                .IsUnicode(false);

            modelBuilder.Entity<LookUp>()
                .Property(e => e.LookUpDescription)
                .IsUnicode(false);

            modelBuilder.Entity<LookUp>()
                .Property(e => e.LookUpCategory)
                .IsUnicode(false);

            modelBuilder.Entity<LookUp>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<LookUp>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.AddressType)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.Address3)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.Address4)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.CountryCode)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.ZipCode)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.TelNo)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.FaxNo)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.MobileNo)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.WebSite)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Address>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Branch>()
                .Property(e => e.BranchCode)
                .IsUnicode(false);

            modelBuilder.Entity<Branch>()
                .Property(e => e.BranchName)
                .IsUnicode(false);

            modelBuilder.Entity<Branch>()
                .Property(e => e.RegNo)
                .IsUnicode(false);

            modelBuilder.Entity<Branch>()
                .Property(e => e.CompanyCode)
                .IsUnicode(false);

            modelBuilder.Entity<Branch>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Branch>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Company>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Company>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<Country>()
                .Property(e => e.CountryCode)
                .IsUnicode(false);

            modelBuilder.Entity<HolidayList>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<HolidayList>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<HolidayList>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.UserID)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.UserName)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.Password)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.MobileNumber)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.RoleCode)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.CreatedBy)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.ModifiedBy)
                .IsUnicode(false);


            modelBuilder.Entity<EmployeeLeaveList>().ToTable("EmployeeLeaveLists", "Leave");
            modelBuilder.Entity<LookUp>().Map<LeaveType>(m => { m.Requires("DiscriminatorTypeId").HasValue(4); });

        }
    }
}
