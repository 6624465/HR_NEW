using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HR.Models
{
    public class SearchViewModel
    {
        public Int16 limit { get; set; }
        public string sortColumn { get; set; }
        public string sortType { get; set; }
        public Int64 recordsCount { get; set; }
        public int EmployeeId { get; set; }
        public Int16 offset { get; set; }
        public string  FirstName{ get; set; }
        public DateTime? DateOfJoining { get; set; }
        public DateTime DOB { get; set; }
        public string CountryCode { get; set; }
        public int Designation { get; set; }
        public List<FilterViewModel> FilterViewModel { get; set; }
    }

    public class FilterViewModel
    {
        public string Value { get; set; }
        public string Field { get; set; }
        public string Type { get; set; }
    }
}