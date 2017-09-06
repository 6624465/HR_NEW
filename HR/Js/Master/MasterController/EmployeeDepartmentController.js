angular.module('ngHR').controller('EmployeeDepartmentController', ['$scope', '$http', 'LookUp', 'growl', 'growlService',
function ($scope, $http, LookUp, growl, growlService) {
    var config = {};
    growl.success(" a success message and not unique", config);
    $scope.init = function () {
        $scope.EmployeeDepartment = {
            IsActive: true,
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

    $scope.IsfrmEmployeeDepartment = false;
    $scope.$watch('frmEmployeeDepartment.$valid', function (Valid) {
        $scope.IsfrmEmployeeDepartment = Valid;
    });


$scope.onEditEmployeeDepartment = function (employeeDepartment) {
    //$scope.EmployeeDepartment.LookUpCode = employeeDepartment.LookUpCode;
    //$scope.EmployeeDepartment.LookUpDescription = employeeDepartment.LookUpDescription;
    //$scope.EmployeeDepartment.IsActive = employeeDepartment.IsActive;
    //$scope.EmployeeDepartment.LookUpID = employeeDepartment.LookUpID;
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
        if (employeeDepartment.LookUpCode != null) {
        if ($scope.IsfrmEmployeeDepartment) {
            LookUp.SaveLookUpData(employeeDepartment).then(function (response) {
                growlService.growl("Saved Successfully..", 'success');
                $('#AddEmployeeDepartmentDialog').modal('hide');
                $scope.GetLookUpData();
            })

        }
        else {
            growlService.growl("Please Enter All  Fileds", 'danger');
        }
    }
    }
    $scope.init();

}])