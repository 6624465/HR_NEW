angular.module('ngHR').controller('SalaryController', ['$scope', '$http','UtilityFunc',
function ($scope, $http, UtilityFunc) {
  
    $scope.init = function () {
        $scope.dateFormat = UtilityFunc.DateFormat();
    }

  
    $scope.init();

}])