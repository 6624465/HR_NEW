angular.module('ngHR').controller('mainController', ['$scope','NgTableParams','LookUp',function ($scope,NgTableParams,LookUp) {
    $scope.designation = true;
    $scope.emptype = false;
    $scope.depttype = false;
    $scope.statustype = false;
    $scope.marriageStatus = false;

    $scope.onClickDesignation = function () {
        $scope.designation = true;
        $scope.emptype = false;
        $scope.depttype = false;
        $scope.statustype = false;
        $scope.marriageStatus = false;
    }
    $scope.onClickType = function () {
        $scope.designation = false;
        $scope.emptype = true;
        $scope.depttype = false;
        $scope.statustype = false;
        $scope.marriageStatus = false;
    }
    $scope.onClickDeptType = function () {
        $scope.designation = false;
        $scope.emptype = false;
        $scope.depttype = true;
        $scope.statustype = false;
        $scope.marriageStatus = false;
    }
    $scope.onClickStatusType = function () {
        $scope.designation = false;
        $scope.emptype = false;
        $scope.depttype = false;
        $scope.statustype = true;
        $scope.marriageStatus = false;
    }
    $scope.onClickMarriageStatusType = function () {
        $scope.designation = false;
        $scope.emptype = false;
        $scope.depttype = false;
        $scope.statustype = false;
        $scope.marriageStatus = true;
    }
    //$scope.LookUpCategory = 'Employee Designation';
    //$scope.selectChanged = function (search) {
    //    if (search.LookUpCategory == 'Employee Designation') {
    //        $scope.LookUpCategory = search.LookUpCategory;
    //        $scope.designation = true;
    //        $scope.emptype = false;
    //        $scope.depttype = false;
    //        $scope.statustype = false;
    //        $scope.marriageStatus = false;
    //    } else if (search.LookUpCategory == 'Employee Department') {
    //        $scope.LookUpCategory = search.LookUpCategory;
    //        $scope.depttype = true;
    //        $scope.designation = false;
    //        $scope.statustype = false;
    //        $scope.emptype = false;
    //        $scope.marriageStatus = false;
    //    }
    //    else if (search.LookUpCategory == 'Employee Type') {

    //        $scope.LookUpCategory = search.LookUpCategory;
    //        $scope.emptype = true;
    //        $scope.designation = false;
    //        $scope.depttype = false;
    //        $scope.statustype = false;
    //        $scope.marriageStatus = false;
    //    } else if (search.LookUpCategory == 'Employee Status') {
    //        $scope.LookUpCategory = search.LookUpCategory;
    //        $scope.statustype = true;
    //        $scope.designation = false;
    //        $scope.emptype = false;
    //        $scope.depttype = false;
    //        $scope.marriageStatus = false;
    //    } else {
    //        $scope.LookUpCategory = search.LookUpCategory;
    //        $scope.statustype = false;
    //        $scope.designation = false;
    //        $scope.emptype = false;
    //        $scope.depttype = false;
    //        $scope.marriageStatus = true;
    //    }

    //};
    
}]);
