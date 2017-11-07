angular.module('ngHR').controller("EmployeeStatusController", ['$scope', '$http', 'LookUp', 'growl', 'growlService','NgTableParams',
    function ($scope, $http, LookUp, growl, growlService, NgTableParams) {
    $scope.init = function () {
        EmployeeStatus = {
            LookUpCategory: 'EmployeeStatus',
            IsActive : true
        };
        EmployeeStatuses = {};
        $scope.GetTableData(true);
        $scope.defaultLookUpCategory = "EmployeeStatus";
    }

    $scope.addEmployeeStatus = function () {
        $scope.clearTextBoxes();
        $scope.EmployeeStatus.IsActive = true;
        $('#AddEmployeeStatusDialog').modal('show');
    }
    //$scope.GetLookUpData = function () {
    //    LookUp.GetLookUpData("EmployeeStatus").then(function (response) {
    //        if (response.data && response.data.message == "Saved Successfully.") {
    //            $scope.EmployeeStatuses = response.data.lookUpLists;
    //            growl.success(" a success message and not unique", {});
    //        }
    //    })
    //}
    //$scope.GetLookUpData();
    var search = {};
    $scope.GetTableData = function (issearch, lookUpCategory) {
        $scope.ngTblStatusData = new NgTableParams({
            page: 0,
            count: 10,
        }, {
            counts: [10, 20, 30],
            getData: function ($defer, params) {
                search.LookUpCategory = lookUpCategory == null ? $scope.defaultLookUpCategory : lookUpCategory;
                search.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                search.limit = params.count();
                if (params.sorting()) {
                    var orderBy = params.orderBy()[0];

                    search.sortColumn = orderBy != undefined ? orderBy.substring(1) : "";
                    search.sortType = orderBy != undefined ? orderBy[0] == '+' ? 'asc' : 'desc' : '';
                }
                
                LookUp.GetTableData(search).then(function (res) {
                    
                    params.total(res.data.total_count);
                    $defer.resolve(res.data.lookUpLists);
                }, function (err) { });
            }
        });
    };
  
    $scope.onEditEmployeeStatus = function (employeeStatus) {
        $scope.EmployeeStatus = angular.copy(employeeStatus);
        $('#AddEmployeeStatusDialog').modal('show');
    }

    $scope.IsfrmEmployeeStatus = false;
    $scope.$watch('frmEmployeeStatus.$valid', function (Valid) {
        $scope.IsfrmEmployeeStatus = Valid;
    });

    $scope.onClickSaveEmployeeStatus = function (employeeStatus) {
        employeeStatus.LookUpCategory = 'EmployeeStatus';
        if (employeeStatus.LookUpCode != null) {
            if ($scope.IsfrmEmployeeStatus) {
                LookUp.SaveLookUpData(employeeStatus).then(function (response) {
                    growlService.growl("Saved Successfully..", 'success');
                    $('#AddEmployeeStatusDialog').modal('hide');
                    $scope.GetTableData(true, "EmployeeStatus");
                })
            }
            else {
                growlService.growl("Please Enter All  Fileds", 'danger');
            }
        }
    }
    $scope.onClickCancelEmployeeStatus = function () {
        $scope.clearTextBoxes();
    },

    $scope.clearTextBoxes = function () {
        $scope.EmployeeStatus = {}
        //$scope.EmployeeDepartment.LookUpDescription = null;
        //$scope.EmployeeDepartment.IsActive = null;
        //$scope.EmployeeDepartment.LookUpID = null;
        $('#AddEmployeeStatusDialog').modal('hide');
    }

    $scope.init();
}])