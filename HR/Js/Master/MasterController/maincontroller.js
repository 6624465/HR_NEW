angular.module('ngHR').controller('mainController', ['$scope', function ($scope) {
    $scope.designation = true;
    $scope.emptype = false;
    $scope.depttype = false;
    $scope.statustype = false;
    $scope.statustype = false;
    $scope.marriageStatus = false;

    $scope.onClickDesignation = function () {
        $scope.designation = true;
        $scope.emptype = false;
        $scope.depttype = false;
        $scope.statustype = false;
        $scope.marriageStatus = false;
    };

    $scope.onClickType = function () {
        $scope.emptype = true;
        $scope.designation = false;
        $scope.depttype = false;
        $scope.statustype = false;
        $scope.marriageStatus = false;
    };
    $scope.onClickDeptType = function () {
        $scope.depttype = true;
        $scope.designation = false;
        $scope.statustype = false;
        $scope.emptype = false;
        $scope.marriageStatus = false;
    };
    $scope.onClickStatusType = function () {
        $scope.statustype = true;
        $scope.designation = false;
        $scope.emptype = false;
        $scope.depttype = false;
        $scope.marriageStatus = false;
    }

    $scope.onClickMarriageStatusType = function () {
        $scope.statustype = false;
        $scope.designation = false;
        $scope.emptype = false;
        $scope.depttype = false;
        $scope.marriageStatus = true;

    }
}]);
