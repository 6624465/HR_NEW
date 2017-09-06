angular.module('ngHR').controller('LeaveTypeController', ['$scope', '$http', 'LookUp', 'growl', 'growlService',
function ($scope, $http, LookUp, growl, growlService) {
    var config = {};
    growl.success(" a success message and not unique", config);
    $scope.init = function () {
        $scope.LeaveType = {
            LookUpID: null,
            LookUpCode: null,
            LookUpDescription: null,
            IsActive: null,
            LookUpCategory: "LeaveType"
        },
        $scope.LeaveTypes = {}
    }

    angular.element('.skin-blue').addClass("sidebar-collapse");

    $scope.GetLookUpData = function () {
        LookUp.GetLookUpData("LeaveType").then(function (response) {
            if (response.data && response.data.message == "Saved Successfully.") {
                $scope.LeaveTypes = response.data.lookUpLists;
                var config = {};
                growl.success(" a success message and not unique", config);
            }
        })

    }
    $scope.GetLookUpData();

    $scope.IsfrmLeaveType = false;
    $scope.$watch('frmLeaveType.$valid', function (Valid) {
        $scope.IsfrmLeaveType = Valid;
    });

    $scope.onClickSaveLeaveType = function (leaveType) {
        if ($scope.LeaveType.LookUpCode != null) {
            if ($scope.IsfrmLeaveType) {
                LookUp.SaveLookUpData(leaveType).then(function (response) {
                    growlService.growl("Saved Successfully..", 'success');
                    $('#AddLeaveTypeDialog').modal('hide');
                    $scope.GetLookUpData();
                })
            }
            else {
                growlService.growl("Please Enter All  Fileds", 'danger');
            }
        }
    },
$scope.onEditLeaveType = function (leaveType) {
    $scope.LeaveType.LookUpCode = leaveType.LookUpCode;
    $scope.LeaveType.LookUpDescription = leaveType.LookUpDescription;
    $scope.LeaveType.IsActive = leaveType.IsActive;
    $scope.LeaveType.LookUpID = leaveType.LookUpID;
    $('#AddLeaveTypeDialog').modal('show');
}

    $scope.onClickCancelLeaveType = function () {
        $scope.clearTextBoxes();
    },

    $scope.addLeaveType = function () {
        $scope.clearTextBoxes();
        $scope.LeaveType.IsActive = true;
        $('#AddLeaveTypeDialog').modal('show');
    };

    $scope.clearTextBoxes = function () {
        $scope.LeaveType.LookUpCode = null;
        $scope.LeaveType.LookUpDescription = null;
        $scope.LeaveType.IsActive = null;
        $scope.LeaveType.LookUpID = null;
        $('#AddLeaveTypeDialog').modal('hide');
    }


    $scope.init();

}])