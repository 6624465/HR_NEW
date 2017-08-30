angular.module('ngHR').controller('EmployeeDepartmentController', ['$scope', '$http', 'LookUp', 'growl', 'growlService',
function ($scope, $http, LookUp, growl, growlService) {
    var config = {};
    growl.success(" a success message and not unique", config);
    $scope.init = function () {
        $scope.EmployeeDepartment = {
            LookUpID: null,
            LookUpCode: null,
            LookUpDescription: null,
            IsActive: null,
            LookUpCategory: "EmployeeDepartment"
        },
        $scope.EmployeeDepartments = {}
    }

    angular.element('.skin-blue').addClass("sidebar-collapse");

    $scope.GetLookUpData = function () {
        LookUp.GetLookUpData("EmployeeDepartment").then(function (response) {
            if (response.data && response.data.message == "Saved Successfully.") {
                $scope.EmployeeDepartments = response.data.lookUpLists;
                var config = {};
                growl.success(" a success message and not unique", config);
            }
        })

    }
    $scope.GetLookUpData();

    $scope.onClickSaveEmployeeDepartment = function (employeeDepartment) {
        debugger;
        if ($scope.EmployeeDepartment.LookUpCode != null && $scope.EmployeeDepartment.LookUpDescription != null) {
            LookUp.SaveLookUpData(employeeDepartment).then(function (response) {
                debugger;
                growlService.growl("Saved Successfully..", 'success');
                $('#AddEmployeeDepartmentDialog').modal('hide');
                $scope.GetLookUpData();
            })
        }
        else {
            growlService.growl("Please Enter All  Fileds", 'danger');
        }
    },
$scope.onEditEmployeeDepartment = function (employeeDepartment) {
    $scope.EmployeeDepartment.LookUpCode = employeeDepartment.LookUpCode;
    $scope.EmployeeDepartment.LookUpDescription = employeeDepartment.LookUpDescription;
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
        $scope.EmployeeDepartment.LookUpCode = null;
        $scope.EmployeeDepartment.LookUpDescription = null;
        $scope.EmployeeDepartment.IsActive = null;
        $scope.EmployeeDepartment.LookUpID = null;
        $('#AddEmployeeDepartmentDialog').modal('hide');
    }


    $scope.init();

}])