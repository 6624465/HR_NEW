angular.module('ngHR').controller('EmployeeInfoController', ['$scope', '$http', 'growlService', '$filter', 'UtilityFunc',
    function ($scope, $http, growlService, $filter, UtilityFunc) {
        $scope.profileEdit = function () {
            angular.element('.pmb-block').toggleClass('toggled');
        }
        $scope.profileeditcancel = function () {
            angular.closest('.pmb-block').removeClass('toggled');
        }
    }])