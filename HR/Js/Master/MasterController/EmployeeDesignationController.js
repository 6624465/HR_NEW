angular.module('ngHR').controller('EmployeeDesignationController', ['$scope', '$http', 'LookUp', 'growl', 'growlService',
function ($scope, $http, LookUp, growl, growlService) {
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
        $scope.EmployeeDesignations = {}
    }

    angular.element('.skin-blue').addClass("sidebar-collapse");

    $scope.GetLookUpData = function () {
        LookUp.GetLookUpData("EmployeeDesignation").then(function (response) {
            if (response.data && response.data.message == "Saved Successfully.") {
                $scope.EmployeeDesignations = response.data.lookUpLists;
                var config = {};
                growl.success(" a success message and not unique", config);
            }
        })
    }

    $scope.IsfrmEmployeeDesignation = false;
    $scope.$watch('frmEmployeeDesignation.$valid', function (Valid) {
        $scope.IsfrmEmployeeDesignation = Valid;
    });

    $scope.onClickSaveEmployeeDesignation = function (employeeDesignation) {
        if ($scope.EmployeeDesignation.LookUpCode != null) {
        if($scope.IsfrmEmployeeDesignation){
            LookUp.SaveLookUpData(employeeDesignation).then(function (response) {
                if (response.data && response.data.message == "Saved Successfully.") {
                    growlService.growl("Saved Successfully..", 'success');
                    $('#AddEmployeeDesignationDialog').modal('hide');

                    $scope.GetLookUpData();
                }
                else
                {
                    growlService.growl(response.data, 'danger');
                }
            })
        }
        else {
            growlService.growl("Please Enter All Fileds", 'danger');
        }
    }
    },
    $scope.GetLookUpData();
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

}])