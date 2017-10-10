angular.module('ngHR').controller('AppliedLeaveListController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc', 'EmployeeLeave', 'growlService',
function ($scope, $http, growl, $filter, UtilityFunc, EmployeeLeave, growlService) {

    $scope.init = function () {
        $scope.EmployeeLeaveList = {}
        $scope.LeaveList = false;
        $scope.AppliedLeaveList = {};
        EmployeeLeave.GetEmployeeLeaveListBasedOnTeamLead().then(function (response) {
            if (response.data && response.data.sucess == true) {
                $scope.EmployeeLeaveList = response.data.employeeLeaveList;
                $scope.test = true;
                angular.forEach($scope.EmployeeLeaveList, function (val, idx) {
                    //$scope.EmployeeLeaveList[idx].SNo = idx + 1;
                    $scope.EmployeeLeaveList[idx].FromDate = moment(val.FromDate).format(UtilityFunc.DateFormat());
                    $scope.EmployeeLeaveList[idx].ToDate = moment(val.ToDate).format(UtilityFunc.DateFormat());
                    $scope.EmployeeLeaveList[idx].ApplyDate = moment(val.ApplyDate).format(UtilityFunc.DateFormat());
                })
            }
        });
    }
    $scope.test = false;
  
    $scope.formatDate = function (date) {
        if (date != null)
            return moment(date).format(UtilityFunc.DateFormat());
        else
            return null;
    }
    $scope.onEditEmployeeLeave = function (employeeLeave) {
        $scope.LeaveList = true;

        $scope.AppliedLeaveList = employeeLeave;

    }
    $scope.Back = function () {
        $scope.AppliedLeaveList = {};
    }
    $scope.AcceptOrReject = function (AppliedLeaveList, status) {
        if (AppliedLeaveList != null) {
            AppliedLeaveList.Status = status;
            EmployeeLeave.SaveEmployeeLeave(AppliedLeaveList).then(function (response) {
                if (response.data && response.data.sucess == true) {
                    growlService.growl(response.data.message, 'success');
                    $scope.LeaveList = false;
                    $scope.init();
                }
            })
        }
    }
    $scope.init();
}])