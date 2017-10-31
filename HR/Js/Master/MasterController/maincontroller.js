angular.module('ngHR').controller('mainController', ['$scope', function ($scope) {
    debugger
    $scope.designation = true;
    $scope.emptype = false;
    $scope.depttype = false;
    $scope.statustype = false;
    $scope.onClickDesignation = function () {
        debugger
        $scope.designation = true;
        $scope.emptype = false;
        $scope.depttype = false;
        $scope.statustype = false;
    };
    $scope.onClickType = function () {
        debugger
        $scope.emptype = true;
        $scope.designation = false;
        $scope.depttype = false;
        $scope.statustype = false;
    };
    $scope.onClickDeptType = function () {
        debugger
        $scope.depttype = true;
        $scope.designation = false;
        $scope.statustype = false;
        $scope.emptype = false;
    };
    $scope.onClickStatusType = function () {
        debugger
        $scope.statustype = true;
        $scope.designation = false;
        $scope.emptype = false;
        $scope.depttype = false;
    }
}]);
