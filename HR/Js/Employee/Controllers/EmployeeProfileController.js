angular.module('ngHR').controller('EmployeeProfileController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc','LookUp',
    'growlService', function ($scope, $http, growl, $filter, UtilityFunc, LookUp, growlService) {
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
        $scope.LookUpData();
    }])

