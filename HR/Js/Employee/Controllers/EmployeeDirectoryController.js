angular.module('ngHR').controller('EmployeeDirectoryController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc', 'growlService', 'EmployeeProfileService',
    'growlService', function ($scope, $http, growl, $filter, UtilityFunc, growlService, EmployeeProfileService) {
        $scope.formatDate = function (date) {
            if (date != null)
                return moment(date).format(UtilityFunc.DateFormat());
            else
                return null;
        }
        EmployeeProfileService.GetEmployeeDetails().then(function (response) {
            $scope.EmployeeDetailsList = response.data.employees;
        });
    }]);