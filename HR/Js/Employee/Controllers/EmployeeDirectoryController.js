angular.module('ngHR').controller('EmployeeDirectoryController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc', 'growlService', 'EmployeeProfileService',
    'growlService', function ($scope, $http, growl, $filter, UtilityFunc, growlService, EmployeeProfileService) {
        $scope.init = function () {
            debugger;
            $scope.GetEmployeeDetails = function () {
                debugger;
                EmployeeProfileService.GetEmployeeDetails().then(function (response) {
                    debugger;
                    $scope.employeeDetailsList = response.data.employees;
                });
            }
        }
        $scope.init();
        $scope.GetEmployeeDetails();
        $scope.AddNewEmployeeDetails = function () {
            debugger;
            location.href = "Employees/EmployeeProfile/EmployeeProfile.cshtml";
        };
    }]);