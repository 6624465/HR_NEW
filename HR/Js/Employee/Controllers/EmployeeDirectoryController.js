angular.module('ngHR').controller('EmployeeDirectoryController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc', 'growlService', 'EmployeeProfileService', 'NgTableParams', 'LookUp', 'HolidayListService','$state','$stateParams',
    'growlService', function ($scope, $http, growl, $filter, UtilityFunc, growlService, EmployeeProfileService, NgTableParams, LookUp, HolidayListService, $state, $stateParams) {


        $scope.init = function () {
            $scope.EmployeeDirectory = {};
            $scope.filter = {}
            $scope.search = {
                FilterViewModel: new Array()
            };
        }
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.formatDate = function (date) {
            if (date != null)
                return moment(date).format(UtilityFunc.DateFormat());
            else
                return null;
        }
        var search = {};
        $scope.EmployeeDetails = function (IsFromSearch) {
            $scope.EmployeeDetailParams = new NgTableParams({
                page: 0,
                count: 10,
                //count: res.length
            },
            {
                counts: [10, 20, 30],
                getData: function ($defer, params) {
                    search.limit = params.count();
                    search.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                    if (params.sorting()) {
                        var orderBy = params.orderBy()[0];

                        search.sortColumn = orderBy != undefined ? orderBy.substring(1) : "";
                        search.sortType = orderBy != undefined ? orderBy[0] == '+' ? 'asc' : 'desc' : '';
                        //search.FilterViewModel = [];
                        //$scope.BindFilterViewModel(sortColumn, sortType);
                    }
                    if (IsFromSearch)
                        $scope.FilterViewModel();

                    EmployeeProfileService.GetEmployeeDetails(search)
                    
                        .then(function (res) {
                            debugger;
                            params.total(res.data.total_count);
                            $defer.resolve(res.data.employees);
                        }, function (err) {
                            //$defer.reject();
                        })
                }
            });
        }
        $scope.EmployeeDetails(false);

        $scope.FilterViewModel = function () {
            var properties = Object.keys($scope.EmployeeDirectory);
            search.FilterViewModel = [];
            debugger;
            angular.forEach(properties, function (val, idx) {
                var Fields = "Where";
                if (val == "FirstName")
                    $scope.BindFilterViewModel(val, Fields);
                if (val == "JoiningDate")
                    $scope.BindFilterViewModel(val, Fields);
                //if (val == "DOB")
                //    $scope.BindFilterViewModel(val, Fields);
                if (val == "EmployeeId")
                    $scope.BindFilterViewModel(val, Fields);
                if (val == "CountryCode")
                    $scope.BindFilterViewModel(val, Fields);
                if (val == "Designation")
                    $scope.BindFilterViewModel(val, Fields);
                if (val == "EmployeeType")
                    $scope.BindFilterViewModel(val, Fields);
            })

            //$scope.getEmployeeDetails();

        }

        

        $scope.BindFilterViewModel = function (val, action) {
            debugger;
            $scope.filter = {};
            $scope.filter.Field = val;
            $scope.filter.Value = !(action == "asc" || action == "desc") ? $scope.EmployeeDirectory[val] : '';
            $scope.filter.Type = action;
            search.FilterViewModel.push($scope.filter);
        }
   
        $scope.GetLookUpData = function () {
            LookUp.GetLookUpData("EmployeeDesignation").then(function (response) {
                if (response.data && response.data.message == "Saved Successfully.") {
                    $scope.EmployeeDesignations = response.data.lookUpLists;
                    growl.success(" a success message and not unique", "success");
                }
            })
            LookUp.GetLookUpData("EmployeeType").then(function (response) {
                if (response.data && response.data.message == "Saved Successfully.") {
                    $scope.EmployeeTypes = response.data.lookUpLists;
                    growl.success(" a success message and not unique", "success");
                }
            })
        }

        $scope.GetLookUpData();
        HolidayListService.GetBranchLocations().then(function (response) {
            if ( response.data.success == true) {
                debugger;
                $scope.Locations = response.data.BranchLocations;
            }
            else
                growlService.growl("Error Occured.", 'danger');
        }, function (err) {
            growlService.growl(err, 'danger');

        })

        $scope.Clear = function () {
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
        }
        $scope.init();
    }]);