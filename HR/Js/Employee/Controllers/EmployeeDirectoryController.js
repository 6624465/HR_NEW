angular.module('ngHR').controller('EmployeeDirectoryController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc', 'growlService', 'EmployeeProfileService', 'NgTableParams',
    'growlService', function ($scope, $http, growl, $filter, UtilityFunc, growlService, EmployeeProfileService, NgTableParams) {
      

        $scope.init = function () {
            $scope.EmployeeDirectory = {};
            $scope.filterViewModel = {
            }
            $scope.search = {
                FilterViewModel: []
            };
        }
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

                    $scope.search.sortColumn = orderBy != undefined ? orderBy.substring(1) : "";
                    $scope.search.sortType = orderBy != undefined ? orderBy[0] == '+' ? 'asc' : 'desc' : '';
                }
                EmployeeProfileService.GetEmployeeDetails({ params: $scope.search, headers: { 'Content-Type': 'application/json' } })
                     .then(function (res) {
                         params.total(res.data.total_count);
                         $defer.resolve(res.data.employees);
                     }, function (reason) {
                         $defer.reject();
                     }
                );
            },
        });

        $scope.FilterViewModel = function () {
            debugger
            var properties = Object.keys($scope.EmployeeDirectory);
            angular.forEach(properties, function (val, idx) {
                debugger
                if (val == "FirstName")
                    $scope.BindFilterViewModel(val);
                if (val == "JoiningDate")
                    $scope.BindFilterViewModel(val);
                if (val == "DOB")
                    $scope.BindFilterViewModel(val);
                if (val == "IDNumber")
                    $scope.BindFilterViewModel(val);
                if (val == "CountryCode")
                    $scope.BindFilterViewModel(val);
                if (val == "Designation")
                    $scope.BindFilterViewModel(val);
            })

        }
        
        $scope.BindFilterViewModel = function (val) {
            $scope.filterViewModel.Field = val;
            $filter('filter')($scope.EmployeeDirectory, val)[0];
            $scope.filterViewModel.Value = $scope.EmployeeDirectory.FirstName;
            $scope.search.FilterViewModel.push($scope.filterViewModel);
        }

        EmployeeProfileService.GetEmployeeDetails().then(function (response) {
            $scope.EmployeeDetailsList = response.data.employees;
        });

        $scope.init();
    }]);