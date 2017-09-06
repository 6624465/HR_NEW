angular.module('ngHR').controller('EmployeeProfileController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc','LookUp','HolidayListService',
    'growlService', function ($scope, $http, growl, $filter, UtilityFunc, LookUp, HolidayListService, growlService) {
        
        $scope.formData = {};
        $scope.detailsUrl = baseUrl + 'Js/Employee/Templates/BasicInformation.html';
        debugger;
        $scope.LookUpData = function () {
            debugger;
            LookUp.GetLookUpData("EmployeeType").then(function (response) {
                debugger;
                $scope.EmployeeTypeList = response.data.lookUpLists;
            })
            LookUp.GetLookUpData("EmployeeStatus").then(function (response) {
                debugger;
                $scope.EmployeeStatusList = response.data.lookUpLists;
            })
            LookUp.GetLookUpData("EmployeeDesignation").then(function (response) {
                debugger;
                $scope.EmployeeDesignation = response.data.lookUpLists;
            })
            LookUp.GetLookUpData("EmployeeDepartment").then(function (response) {
                debugger;
                $scope.EmployeeDepartment = response.data.lookUpLists;
            })
        }
        $scope.BranchLocations = function () {
            HolidayListService.GetBranchLocations().then(function (response) {
                if (response.data && response.data.success == true) {
                    $scope.Locations = response.data.BranchLocations;
                }
                else
                    growlService.growl("Error Occured.", 'danger');
            }, function (err) {
                growlService.growl(err, 'danger');

            })
        };

        $scope.LookUpData();
        $scope.BranchLocations();
    }])

