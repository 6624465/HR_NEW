angular.module('ngHR').controller('AppliedLeaveListController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc', 'EmployeeLeave', 'growlService',
function ($scope, $http, growl, $filter, UtilityFunc, EmployeeLeave, growlService) {

    $scope.init = function () {
        $scope.EmployeeLeaveList = {}
        $scope.LeaveList = false;
        $scope.AppliedLeaveList = {};
    }

    $scope.init();

    $scope.SearchEmployeeLeaveList = function (TeamLeadId) {
        EmployeeLeave.GetEmployeeLeaveListBasedOnTeamLead(TeamLeadId).then(function (response) {
            if (response.data && response.data.sucess == true) {
                $scope.EmployeeLeaveList = response.data.employeeLeaveList;
                angular.forEach($scope.EmployeeLeaveList, function (val, idx) {
                    debugger
                    $scope.EmployeeLeaveList[idx].SNo = idx + 1;
                    //var todate = moment().format(UtilityFunc.DateFormat());
                    //var appliedDate = moment(val.ApplyDate).format(UtilityFunc.DateFormat());
                    $scope.EmployeeLeaveList[idx].ApplyDate = moment(val.ApplyDate).format(UtilityFunc.DateFormat());

                })
                //growlService.growl(response.data.message, 'success');
            }
        });
    };

}])