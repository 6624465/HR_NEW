angular.module('ngHR').controller('EmployeeDirectoryController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc', 'growlService', 'EmployeeProfileService', 'NgTableParams','LookUp','HolidayListService',
    'growlService', function ($scope, $http, growl, $filter, UtilityFunc, growlService, EmployeeProfileService, NgTableParams,LookUp,HolidayListService) {
      

        $scope.init = function () {
            $scope.EmployeeDirectory = {};
            $scope.filterViewModel = {
            }
            $scope.search = {
                FilterViewModel: []
            };
        }
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.formatDate = function (date) {
            if (date != null)
                return moment(date).format(UtilityFunc.DateFormat());
            else
                return null;
        }

        $scope.tableParams = new NgTableParams({
            page: 1,
            count: 10,
        }, {
            getData: function ($defer, params) {
                var page = params.page();
                var size = params.count();
                $scope.search.page = page;
                $scope.search.per_page = size;
                $scope.search.limit = params.count();
                    
                if (params.sorting()) {
                    var orderBy = params.orderBy()[0];

                    var sortColumn = orderBy != undefined ? orderBy.substring(1) : "";
                    var sortType = orderBy != undefined ? orderBy[0] == '+' ? 'asc' : 'desc' : '';
                    $scope.BindFilterViewModel(sortColumn, '', sortType);

                    $scope.getEmployeeDetails();
                }
               
            },
        });

        $scope.FilterViewModel = function () {
            var properties = Object.keys($scope.EmployeeDirectory);
            angular.forEach(properties, function (val, idx) {
                if (val == "FirstName")
                    $scope.BindFilterViewModel(val, action);
                if (val == "JoiningDate")
                    $scope.BindFilterViewModel(val, action);
                if (val == "DOB")
                    $scope.BindFilterViewModel(val, action);
                if (val == "IDNumber")
                    $scope.BindFilterViewModel(val, action);
                if (val == "CountryCode")
                    $scope.BindFilterViewModel(val, action);
                if (val == "Designation")
                    $scope.BindFilterViewModel(val, action);
            })

            $scope.getEmployeeDetails();

        }
        
        $scope.BindFilterViewModel = function (val, action) {
            $scope.filterViewModel.Field = val;
            $scope.filterViewModel.Value = (action == "asc" || action == "desc") ? $scope.EmployeeDirectory[val] : '';
            $scope.filterViewModel.Action = action;
            $scope.search.FilterViewModel.push($scope.filterViewModel);
        }

        EmployeeProfileService.GetEmployeeDetails().then(function (response) {
            $scope.EmployeeDetailsList = response.data.employees;
        });

        $scope.getEmployeeDetails = function () {
            EmployeeProfileService.GetEmployeeDetails({ params: $scope.search, headers: { 'Content-Type': 'application/json' } })
                    .then(function (res) {
                        params.total(res.data.total_count);
                        $defer.resolve(res.data.employees);
                    }, function (reason) {
                        $defer.reject();
                    });
        }

        $scope.GetLookUpData = function () {
            LookUp.GetLookUpData("EmployeeDesignation").then(function (response) {
                if (response.data && response.data.message == "Saved Successfully.") {
                    $scope.EmployeeDesignations = response.data.lookUpLists;
                    var config = {};
                    growl.success(" a success message and not unique", config);
                }
            })
        }
        $scope.GetLookUpData();
        HolidayListService.GetBranchLocations().then(function (response) {
            if (response.data && response.data.success == true) {
                $scope.Locations = response.data.BranchLocations;
            }
            else
                growlService.growl("Error Occured.", 'danger');
        }, function (err) {
            growlService.growl(err, 'danger');

        })


        $scope.init();
    }]);