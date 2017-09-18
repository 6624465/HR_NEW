angular.module('ngHR').controller('EmployeeDirectoryController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc', 'growlService', 'EmployeeProfileService', 'NgTableParams', 'LookUp', 
    'growlService', function ($scope, $http, growl, $filter, UtilityFunc, growlService, EmployeeProfileService, NgTableParams, LookUp) {


        $scope.init = function () {
            $scope.EmployeeDirectory = {};
            $scope.filterViewModel = {}
            $scope.search = {
                FilterViewModel: []
            };

            $scope.dateFormat = UtilityFunc.DateFormat();
        }
        $scope.formatDate = function (date) {
            if (date != null)
                return moment(date).format(UtilityFunc.DateFormat());
            else
                return null;
        }
        var search = {};
        $scope.EmployeeDetails = function (IsFromSearch) {
            $scope.tableParams = new NgTableParams({
                page: 0,
                count:10,
                sorting: {
                    CreatedOn: 'desc'
                }
            }, {

                getData: function ($defer, params) {
                    debugger;
                    search.page = params.page();
                    search.per_page = params.count();
                    search.limit = params.count();
                    debugger;
                    if (params.sorting()) {
                        var orderBy = params.orderBy()[0];

                        var sortColumn = orderBy != undefined ? orderBy.substring(1) : "";
                        var sortType = orderBy != undefined ? orderBy[0] == '+' ? 'asc' : 'desc' : '';

                        search.FilterViewModel = [];
                        $scope.BindFilterViewModel(sortColumn, sortType);
                    }
                    if (IsFromSearch)
                        $scope.FilterViewModel();

                    EmployeeProfileService.GetEmployeeDetails(search)
                        .then(function (res) {
                            debugger;
                            params.total(res.data.total_count);
                            $defer.resolve(res.data.employees);
                        }, function (err) {
                            $defer.reject();
                        })
                }
            });
        }
        $scope.EmployeeDetails(false);

        $scope.FilterViewModel = function () {
            var properties = Object.keys($scope.EmployeeDirectory);
            search.FilterViewModel = [];
            angular.forEach(properties, function (val, idx) {
                var Fields = "Where";
                if (val == "FirstName")
                    $scope.BindFilterViewModel(val, Fields);
                if (val == "JoiningDate")
                    $scope.BindFilterViewModel(val, Fields);
                if (val == "EmployeeId")
                    $scope.BindFilterViewModel(val, Fields);
                if (val == "CountryCode")
                    $scope.BindFilterViewModel(val, Fields);
                if (val == "Designation")
                    $scope.BindFilterViewModel(val, Fields);
            })

            //$scope.getEmployeeDetails();

        }

        $scope.BindFilterViewModel = function (val, action) {
            $scope.filterViewModel.Field = val;
            $scope.filterViewModel.Value = !(action == "asc" || action == "desc") ? $scope.EmployeeDirectory[val] : '';
            $scope.filterViewModel.Type = action;
            search.FilterViewModel.push($scope.filterViewModel);
        }

        $scope.GetLookUpData = function () {
            LookUp.GetLookUpData("EmployeeDesignation").then(function (response) {
                if (response.data && response.data.message == "Saved Successfully.") {
                    $scope.EmployeeDesignations = response.data.lookUpLists;
                    growl.success(" a success message and not unique", "success");
                }
            });
            LookUp.GetCountries().then(function (res) {
                $scope.Countries = res.data.countries;
            });
        }
        $scope.Clear = function () {
            $scope.EmployeeDirectory = {};
            
        };

        $scope.GetLookUpData();
        $scope.init();
    }]);