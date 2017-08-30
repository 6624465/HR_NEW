angular.module('ngHR').controller('AppliedLeaveListController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc','EmployeeLeave', 'growlService',
function ($scope, $http, growl, $filter, UtilityFunc, EmployeeLeave, growlService) {   

    $scope.init = function () {
        $scope.EmployeeLeaveList = {}
        $scope.LeaveList = false;
     
    }
 
    $scope.init();

    $scope.SearchEmployeeLeaveList = function (TeamLeadId) {
        EmployeeLeave.GetEmployeeLeaveListBasedOnTeamLead(TeamLeadId).then(function (response) {
            if (response.data && response.data.sucess == true) {
                            $scope.EmployeeLeaveList = response.data.employeeLeaveList;
                            //growlService.growl(response.data.message, 'success');
                        }
        });
    };
 
}])
