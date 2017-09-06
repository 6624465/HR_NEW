angular.module('ngHR').controller('EmployeeProfileController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc', 
    'growlService', function ($scope, $http, growl, $filter, UtilityFunc, growlService) {
        $scope.formData = {};
        $scope.detailsUrl = baseUrl + 'Js/Employee/Templates/BasicInformation.html';
}])