angular.module('ngHR').controller('RolesController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc','RoleService','growlService',
function ($scope, $http, growl, $filter, UtilityFunc, RoleService,growlService) {

    $scope.addEmployeeRoles = function () {
        $('#addEmployeeRolesdialog').modal('show');
        $scope.role.RoleCode = "";
        $scope.role.RoleDescription = "";
    };

    $scope.role = {
        IsActive: true
    },
    $scope.SaveEmployeeRoles = function () {
        RoleService.SaveEmployeeRoles($scope.role).then(function (res) {
            if (response.data && response.data.message == "Saved Successfully.")
            {
                growlService.growl("Saved Successfully..", 'success');
            }
        });
    }
    $scope.List=function()
    {
        RoleService.GetRoles().then(function (response) {
            $scope.roles = response.data.Roles;
            $scope.onEditRoles();
        });
    }
    $scope.List();
    $scope.onEditRoles = function (employeeRoles) {
        $scope.role.RoleCode= employeeRoles.RoleCode;
        $scope.role.RoleDescription = employeeRoles.RoleDescription;
        $('#addEmployeeRolesdialog').modal('show');
    };
    $scope.onClickClose = function () {
        $('#addEmployeeRolesdialog').modal('hide');
    };
}]);