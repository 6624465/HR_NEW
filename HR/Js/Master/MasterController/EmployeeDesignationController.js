angular.module('ngHR').controller('EmployeeDesignationController', ['$scope', '$http', 'LookUp', 'growl', 'growlService', 'NgTableParams','$rootScope',
function ($scope, $http, LookUp, growl, growlService, NgTableParams,$rootScope) {
    var config = {};
    growl.success(" a success message and not unique", config);
    $scope.init = function () {
        $scope.EmployeeDesignation = {
            LookUpID: null,
            LookUpCode: null,
            LookUpDescription: null,
            IsActive: null,
            LookUpCategory: "EmployeeDesignation"
          

        },
        $scope.EmployeeDesignations = {},
        $scope.GetLookUpData(true);
        $scope.defaultLookUpCategory = "EmployeeDesignation";
        $scope.designationShow = false;
        
    }
   
    //angular.element('.skin-blue').addClass("sidebar-collapse");

    //$scope.GetLookUpData = function () {
    //    LookUp.GetLookUpData("EmployeeDesignation").then(function (response) {
    //        if (response.data && response.data.message == "Saved Successfully.") {
    //            $scope.EmployeeDesignations = response.data.lookUpLists;
    //            var config = {};
    //            growl.success(" a success message and not unique", config);
    //        }
    //    })
    //}
    var DataTblobj = {};
    $scope.GetLookUpData = function (issearch, lookUpCategory) {
        $scope.ngTblData = new NgTableParams({
            page: 0,
            count: 10,
        }, {
            counts: [10, 20, 30],
            getData: function ($defer, params) {
                DataTblobj.LookUpCategory = lookUpCategory == null ? $scope.defaultLookUpCategory : lookUpCategory;
                DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                DataTblobj.limit = params.count();
                if (params.sorting()) {
                    var orderBy = params.orderBy()[0];

                    DataTblobj.sortColumn = orderBy != undefined ? orderBy.substring(1) : "";
                    DataTblobj.sortType = orderBy != undefined ? orderBy[0] == '+' ? 'asc' : 'desc' : '';
                }
                LookUp.GetTableData(DataTblobj).then(function (res) {
                    params.total(res.data.total_count);
                    $defer.resolve(res.data.lookUpLists);
                }, function (err) { });
            }
        });
    }


    $scope.IsfrmEmployeeDesignation = false;
    $scope.$watch('frmEmployeeDesignation.$valid', function (Valid) {
        $scope.IsfrmEmployeeDesignation = Valid;
    });

    $scope.onClickSaveEmployeeDesignation = function (employeeDesignation) {
        if ($scope.EmployeeDesignation.LookUpCode != null) {
            if ($scope.IsfrmEmployeeDesignation) {
                LookUp.SaveLookUpData(employeeDesignation).then(function (response) {
                    if (response.data && response.data.message == "Saved Successfully.") {
                        growlService.growl("Saved Successfully..", 'success');
                        $('#AddEmployeeDesignationDialog').modal('hide');

                        $scope.GetLookUpData(true, "EmployeeDesignation");
                    }
                    else {
                        growlService.growl(response.data, 'danger');
                    }
                })
            }
            else {
                growlService.growl("Please Enter All Fileds", 'danger');
            }
        }
    },
    //$scope.GetLookUpData();
    $scope.onEditEmployeeDesignation = function (employeeDesignation) {
        $scope.EmployeeDesignation.LookUpCode = employeeDesignation.LookUpCode;
        $scope.EmployeeDesignation.LookUpDescription = employeeDesignation.LookUpDescription;
        $scope.EmployeeDesignation.IsActive = employeeDesignation.IsActive;
        $scope.EmployeeDesignation.LookUpID = employeeDesignation.LookUpID;
        $('#AddEmployeeDesignationDialog').modal('show');

    }

    $scope.onClickCancelEmployeeDesignation = function () {
        $scope.clearTextBoxes();
    },

    $scope.addEmployeeDesignation = function () {
        $scope.clearTextBoxes();
        $scope.EmployeeDesignation.IsActive = true;
        $('#AddEmployeeDesignationDialog').modal('show');
    };

    $scope.clearTextBoxes = function () {
        $scope.EmployeeDesignation.LookUpCode = null;
        $scope.EmployeeDesignation.LookUpDescription = null;
        $scope.EmployeeDesignation.IsActive = null;
        $scope.EmployeeDesignation.LookUpID = null;
        $('#AddEmployeeDesignationDialog').modal('hide');
    }


    $scope.init();

}]);
