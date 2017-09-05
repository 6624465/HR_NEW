angular.module('ngHR').controller('EmployeeTypeController', ['$scope', '$http', 'LookUp', 'growl', 'growlService',
function ($scope, $http, LookUp, growl, growlService) {
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
        $scope.EmployeeTypes = {}
    }

    angular.element('.skin-blue').addClass("sidebar-collapse");

    $scope.GetLookUpData = function () {
        LookUp.GetLookUpData("EmployeeType").then(function (response) {
            if (response.data && response.data.message == "Saved Successfully.") {
                $scope.EmployeeTypes = response.data.lookUpLists;
                var config = {};
                growl.success(" a success message and not unique", config);
            }
        })
    }
    $scope.GetLookUpData();

    $scope.IsfrmEmployeeType = false;
    $scope.$watch('frmEmployeeType .$valid', function (Valid) {
        debugger;
        $scope.IsfrmEmployeeType = Valid;
    });

    $scope.onClickSaveEmployeeType = function (employeeType) {
        debugger;
        if ($scope.EmployeeType.LookUpCode != null) {
        if ($scope.IsfrmEmployeeType) {
            debugger;
            LookUp.SaveLookUpData(employeeType).then(function (response) {
                debugger;
                growlService.growl("Saved Successfully..", 'success');
                $('#AddEmployeeTypeDialog').modal('hide');
                $scope.GetLookUpData();
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