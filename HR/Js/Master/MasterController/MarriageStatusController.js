angular.module('ngHR').controller("MarriageStatusController", ['$scope', '$http', 'LookUp', 'growl', 'growlService', 'NgTableParams',
    function ($scope, $http, LookUp, growl, growlService, NgTableParams) {
    $scope.init = function () {
        $scope.MarriageStatus = {
            LookUpCategory: 'MartialSatus',
            IsActive: true
        };
        $scope.MarriageStatuses = {};
       
    }
    $scope.init();
    $scope.addMarriageStatus = function () {
        $scope.clearTextBoxes();
        $scope.MarriageStatus.IsActive = true;
        $('#AddMarriageStatusDialog').modal('show');
    }
    var DataTblobj = {};
    $scope.GetLookUpData = function (issearch, lookUpCategory) {
        $scope.ngTblMarriageStatusData = new NgTableParams({
            page: 0,
            count: 10,
        }, {
            //counts: [10, 20, 30],
            getData: function ($defer, params) {
                DataTblobj.LookUpCategory = lookUpCategory == null ? $scope.MarriageStatus.LookUpCategory : lookUpCategory;
                DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                DataTblobj.limit = params.count();
               
                if (params.sorting()) {
                    var orderBy = params.orderBy()[0];

                    DataTblobj.sortColumn = orderBy != undefined ? orderBy.substring(1) : "";
                    DataTblobj.sortType = orderBy != undefined ? orderBy[0] == '+' ? 'asc' : 'desc' : '';
                }
                LookUp.GetTableData(DataTblobj).then(function (res) {
                    params.total(res.data.total_count);
                    params.settings({ counts: res.data.total_count> 10 ? [10, 20, 30] : [] });
                    $defer.resolve(res.data.lookUpLists);

                }, function (err) { });
            }
        });
    }

    $scope.$watch('ngTblMarriageStatusData', function (params) {
        $scope.users = data.slice((params.page() - 1) * params.count(), params.page() * params.count());
    }, true);
    $scope.onEditMarriageStatus = function (marriageStatus) {
      //  $scope.MarriageStatus = angular.copy(marriageStatus);
        $scope.MarriageStatus.LookUpCode = marriageStatus.employeeDesignation;
        $scope.MarriageStatus.LookUpDescription = marriageStatus.employeeDescription;
        $scope.MarriageStatus.IsActive = marriageStatus.IsActive;
        $scope.MarriageStatus.LookUpID = marriageStatus.LookUpID;
        $('#AddMarriageStatusDialog').modal('show');
    }

    $scope.IsfrmMarriageStatus = false;
    $scope.$watch('frmMarriageStatus.$valid', function (Valid) {
        $scope.IsfrmMarriageStatus = Valid;
    });

    $scope.onClickSaveMarriageStatus = function (marriageStatus) {
        marriageStatus.LookUpCategory = 'MartialSatus';
        if (marriageStatus.LookUpCode != null) {
            if ($scope.IsfrmMarriageStatus) {
                LookUp.SaveLookUpData(marriageStatus).then(function (response) {
                    growlService.growl("Saved Successfully..", 'success');
                    $('#AddMarriageStatusDialog').modal('hide');
                    $scope.GetLookUpData(true, $scope.MarriageStatus.LookUpCategory);
                })
            }
            else {
                growlService.growl("Please Enter All  Fileds", 'danger');
            }
        }
    }
    $scope.onClickCancelMarriageStatus = function () {
        $scope.clearTextBoxes();
    },

    $scope.clearTextBoxes = function () {
        $scope.MarriageStatus = {}
        //$scope.EmployeeDepartment.LookUpDescription = null;
        //$scope.EmployeeDepartment.IsActive = null;
        //$scope.EmployeeDepartment.LookUpID = null;
        $('#AddMarriageStatusDialog').modal('hide');
    }

    
    $scope.GetLookUpData(true);
}])