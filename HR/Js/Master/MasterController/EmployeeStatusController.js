angular.module('ngHR').controller("EmployeeStatusController", ['$scope', '$http', 'LookUp', 'growl', 'growlService', function ($scope, $http, LookUp,growl, growlService) {
    $scope.init = function () {
        EmployeeStatus = {
            LookUpCategory: 'EmployeeStatus',
            IsActive : true
        };
        EmployeeStatuses = {};
    }

    $scope.addEmployeeStatus = function () {
        $scope.clearTextBoxes();
        $scope.EmployeeStatus.IsActive = true;
        $('#AddEmployeeStatusDialog').modal('show');
    }
    $scope.GetLookUpData = function () {
        LookUp.GetLookUpData("EmployeeStatus").then(function (response) {
            if (response.data && response.data.message == "Saved Successfully.") {
                $scope.EmployeeStatuses = response.data.lookUpLists;
                growl.success(" a success message and not unique", {});
            }
        })
    }
    $scope.GetLookUpData();
  
    $scope.onEditEmployeeStatus = function (employeeStatus) {
        $scope.EmployeeStatus = employeeStatus;
        $('#AddEmployeeStatusDialog').modal('show');
    }

    $scope.onClickSaveEmployeeStatus = function (employeeStatus) {
        employeeStatus.LookUpCategory = 'EmployeeStatus';
        if (employeeStatus.LookUpCode != null && employeeStatus.LookUpDescription != null) {
            LookUp.SaveLookUpData(employeeStatus).then(function (response) {
                growlService.growl("Saved Successfully..", 'success');
                $('#AddEmployeeStatusDialog').modal('hide');
                $scope.GetLookUpData();
            })
        }
        else {
            growlService.growl("Please Enter All  Fileds", 'danger');
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