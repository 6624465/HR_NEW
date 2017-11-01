angular.module('ngHR').controller('mainController', ['$scope','NgTableParams','LookUp',function ($scope,NgTableParams,LookUp) {
    $scope.designation = true;
    $scope.emptype = false;
    $scope.depttype = false;
    $scope.statustype = false;
    $scope.statustype = false;
    $scope.marriageStatus = false;

    //$scope.onClickDesignation = function () {
    //    $scope.designation = true;
    //    $scope.emptype = false;
    //    $scope.depttype = false;
    //    $scope.statustype = false;
    //    $scope.marriageStatus = false;
    //};

    //$scope.onClickType = function () {
    //    $scope.emptype = true;
    //    $scope.designation = false;
    //    $scope.depttype = false;
    //    $scope.statustype = false;
    //    $scope.marriageStatus = false;
    //};
    //$scope.onClickDeptType = function () {
    //    $scope.depttype = true;
    //    $scope.designation = false;
    //    $scope.statustype = false;
    //    $scope.emptype = false;
    //    $scope.marriageStatus = false;
    //};
    //$scope.onClickStatusType = function () {
    //    $scope.statustype = true;
    //    $scope.designation = false;
    //    $scope.emptype = false;
    //    $scope.depttype = false;
    //    $scope.marriageStatus = false;
    //};

    //$scope.onClickMarriageStatusType = function () {
    //    $scope.statustype = false;
    //    $scope.designation = false;
    //    $scope.emptype = false;
    //    $scope.depttype = false;
    //    $scope.marriageStatus = true;

    //}
  
    //$scope.lookup = [{ LookUpCategory: "Employee Department" },
    //                 { LookUpCategory: "EmployeeType" },
    //                 { LookUpCategory: "EmployeeStatus" },
    //                 { LookUpCategory: "EmployeeDesignation" },
    //                 { LookUpCategory: "MaritalStatus" }];
    $scope.selectChanged = function (search) {
        //if (search == undefined || search == null || search == "") {
        //    $scope.designation = false;
        //    $scope.emptype = false;
        //    $scope.depttype = false;
        //    $scope.statustype = false;
        //    $scope.marriageStatus = false;
        //} else {
            debugger
            if (search.LookUpCategory == 'EmployeeDesignation') {
                $scope.designation = true;
                $scope.emptype = false;
                $scope.depttype = false;
                $scope.statustype = false;
                $scope.marriageStatus = false;
            } else if (search.LookUpCategory == 'EmployeeDepartment') {
                $scope.depttype = true;
                $scope.designation = false;
                $scope.statustype = false;
                $scope.emptype = false;
                $scope.marriageStatus = false;
            }
            else if (search.LookUpCategory == 'EmployeeType') {
                $scope.emptype = true;
                $scope.designation = false;
                $scope.depttype = false;
                $scope.statustype = false;
                $scope.marriageStatus = false;
            } else if (search.LookUpCategory == 'EmployeeStatus') {
                $scope.statustype = true;
                $scope.designation = false;
                $scope.emptype = false;
                $scope.depttype = false;
                $scope.marriageStatus = false;
            } else {
                $scope.statustype = false;
                $scope.designation = false;
                $scope.emptype = false;
                $scope.depttype = false;
                $scope.marriageStatus = true;
            }
        //}
            };

   

    
}]);
