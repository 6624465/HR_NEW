angular.module('ngHR').controller('EmployeeDepartmentController', ['$scope', '$http', 'LookUp', 'growl', 'growlService','NgTableParams',
function ($scope, $http, LookUp, growl, growlService, NgTableParams) {
    var config = {};
    growl.success(" a success message and not unique", config);
    $scope.init = function () {
        $scope.EmployeeDepartment = {
            IsActive: true,
            LookUpCategory: "EmployeeDepartment"
        },
        $scope.EmployeeDepartments = {};
        $scope.GetTableData(true);
        $scope.defaultLookupCategory = "EmployeeDepartment";
    }

    angular.element('.skin-blue').addClass("sidebar-collapse");

    //$scope.GetLookUpData = function () {
    //    LookUp.GetLookUpData("EmployeeDepartment").then(function (response) {
    //        if (response.data && response.data.message == "Saved Successfully.") {
    //            $scope.EmployeeDepartments = response.data.lookUpLists;
    //            var config = {};
    //            growl.success(" a success message and not unique", config);
    //        }
    //    })

    //}
    //$scope.GetLookUpData();

    var search = {};
    $scope.GetTableData = function (issearch, lookupcategory) {
        $scope.ngTblDepartmentData = new NgTableParams({
            page: 0,
            count: 10,
        }, {
           // counts: [10, 20, 30],
            getData: function ($defer, params) {
                search.LookUpCategory = lookupcategory == null ? $scope.defaultLookupCategory : lookupcategory;
                search.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                search.limit = params.count();
                if (params.sorting()) {
                    var orderBy = params.orderBy()[0];

                    search.sortColumn = orderBy != undefined ? orderBy.substring(1) : "";
                    search.sortType = orderBy != undefined ? orderBy[0] == '+' ? 'asc' : 'desc' : '';
                }
                LookUp.GetTableData(search).then(function (res) {
                    params.total(res.data.total_count);
                    params.settings({ counts: res.data.total_count > 10 ? [10, 20, 30] : [] });
                    $defer.resolve(res.data.lookUpLists);
                }, function (err) { });
            }
        });
    };
    $scope.IsfrmEmployeeDepartment = false;
    $scope.$watch('frmEmployeeDepartment.$valid', function (Valid) {
        $scope.IsfrmEmployeeDepartment = Valid;
    });


    $scope.onEditEmployeeDepartment = function (employeeDepartment) {
        
        //$scope.EmployeeDepartment = angular.copy(employeeDepartment);
        $scope.EmployeeDepartment.LookUpCode = employeeDepartment.employeeDesignation;
        $scope.EmployeeDepartment.LookUpDescription = employeeDepartment.employeeDescription;
        $scope.EmployeeDepartment.IsActive = employeeDepartment.IsActive;
        $scope.EmployeeDepartment.LookUpID = employeeDepartment.LookUpID;
        $('#AddEmployeeDepartmentDialog').modal('show');
    }

    $scope.onClickCancelEmployeeDepartment = function () {
        $scope.clearTextBoxes();
    },

    $scope.addEmployeeDepartment = function () {
        $scope.clearTextBoxes();
        $scope.EmployeeDepartment.IsActive = true;
        $('#AddEmployeeDepartmentDialog').modal('show');
    };

    $scope.clearTextBoxes = function () {
        $scope.EmployeeDepartment = {};
        $('#AddEmployeeDepartmentDialog').modal('hide');
        $scope.IsfrmEmployeeDepartment = false;
    }


    $scope.onClickSaveEmployeeDepartment = function (employeeDepartment) {
        employeeDepartment.LookUpCategory = "EmployeeDepartment";
        if (employeeDepartment.LookUpCode != null) {
            if ($scope.IsfrmEmployeeDepartment) {
                LookUp.SaveLookUpData(employeeDepartment).then(function (response) {
                    growlService.growl("Saved Successfully..", 'success');
                    $('#AddEmployeeDepartmentDialog').modal('hide');
                    $scope.GetTableData(true,"EmployeeDepartment");
                })

            }
            else {
                growlService.growl("Please Enter All  Fileds", 'danger');
            }
        }
    }
    $scope.init();

}])