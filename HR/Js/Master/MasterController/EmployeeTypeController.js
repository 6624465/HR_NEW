angular.module('ngHR').controller('EmployeeTypeController', ['$scope', '$http', 'LookUp', 'growl', 'growlService','NgTableParams',
function ($scope, $http, LookUp, growl, growlService, NgTableParams) {
    var config = {};
    growl.success(" a success message and not unique", config);
    $scope.init = function () {
        $scope.EmployeeType = {
            LookUpID: null,
            LookUpCode: null,
            LookUpDescription: null,
            IsActive: null,
            LookUpCategory: "EmployeeType"
        },
        $scope.EmployeeTypes = {},
        $scope.GetTableData(true);
        $scope.defaultLookUpCategory = "EmployeeType";
    };

    angular.element('.skin-blue').addClass("sidebar-collapse");

    //$scope.GetLookUpData = function () {
    //    LookUp.GetLookUpData("EmployeeType").then(function (response) {
    //        if (response.data && response.data.message == "Saved Successfully.") {
    //            $scope.EmployeeTypes = response.data.lookUpLists;
    //            var config = {};
    //            growl.success(" a success message and not unique", config);
    //        }
    //    })
    //}

    var search = {};
    $scope.GetTableData = function (issearch, LookUpCategory) {
        $scope.ngTblTypeData = new NgTableParams({
            page: 0,
            count: 10,
        }, {
           // counts: [10, 20, 30],
            getData: function ($defer, params) {
                search.LookUpCategory = LookUpCategory == null ? $scope.defaultLookUpCategory : LookUpCategory;
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
    }

    $scope.IsfrmEmployeeType = false;
    $scope.$watch('frmEmployeeType .$valid', function (Valid) {
        $scope.IsfrmEmployeeType = Valid;
    });

    $scope.onClickSaveEmployeeType = function (employeeType) {
        if ($scope.EmployeeType.LookUpCode != null) {
        if ($scope.IsfrmEmployeeType) {
            LookUp.SaveLookUpData(employeeType).then(function (response) {
                growlService.growl("Saved Successfully..", 'success');
                $('#AddEmployeeTypeDialog').modal('hide');
                $scope.GetTableData(true, "EmployeeType");
            })
        }
        else {

            growlService.growl("Please Enter All Fileds", 'danger');
        }
    }
    },
$scope.onEditEmployeeType = function (employeeType) {
    $scope.EmployeeType.LookUpCode = employeeType.LookUpCode;
    $scope.EmployeeType.LookUpDescription = employeeType.LookUpDescription;
    $scope.EmployeeType.IsActive = employeeType.IsActive;
    $scope.EmployeeType.LookUpID = employeeType.LookUpID;
    $('#AddEmployeeTypeDialog').modal('show');

}

    $scope.onClickCancelEmployeeType = function () {
        $scope.clearTextBoxes();
    },

    $scope.addEmployeeType = function () {
        $scope.clearTextBoxes();
        $scope.EmployeeType.IsActive = true;
        $('#AddEmployeeTypeDialog').modal('show');
    };

    $scope.clearTextBoxes = function () {
        $scope.EmployeeType.LookUpCode = null;
        $scope.EmployeeType.LookUpDescription = null;
        $scope.EmployeeType.IsActive = null;
        $scope.EmployeeType.LookUpID = null;
        $('#AddEmployeeTypeDialog').modal('hide');
    }


    $scope.init();

}])