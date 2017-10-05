angular.module('ngHR').controller('EmployeeLeaveFormController', ['$scope', '$http','UtilityFunc', 'growlService','limitToFilter','EmployeeLeave','LookUp',
function ($scope, $http, UtilityFunc, growlService, limitToFilter, EmployeeLeave,LookUp) {
   
    $scope.init = function () {
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.EmployeeLeaveForm = {
            BranchID: UtilityFunc.BranchId(),
            FromDate: moment(),
            ToDate: moment(),
        }
        $scope.LeaveType = {}
        $scope.maxdate = moment();
        datepickerOptions: {
            minDate: moment();
        }
    };

    LookUp.GetActiveLookUpData("LeaveType").then(function (response) {
        if (response.data && response.data.success == true) {
            $scope.LeaveType = response.data.lookUpLists;
        }
    }, function () {
    })
  
    $scope.EmployeeList = function (text) {
        return EmployeeLeave.GetEmployees(text).then(function (response) {
            return limitToFilter(response.data.employies, 15);
        }, function (err) { });
    };

    $scope.EmployeeSelected = function (obj) {
        $scope.EmployeeLeaveForm.EmployeeId = obj.Id;
        $scope.EmployeeLeaveForm.EmployeeName = obj.FirstName;
    }
    $scope.difference = function () {
        var diffDate = (Math.round(Math.abs((new Date($scope.EmployeeLeaveForm.FromDate).getTime() -new Date($scope.EmployeeLeaveForm.ToDate).getTime()) / (24 * 60 * 60 * 1000))));
            $scope.EmployeeLeaveForm.Days = diffDate +1;
    } 
    /*Save Section*/
    $scope.IsfrmEmployeeLeaveForm = false;
    $scope.$watch('frmEmployeeLeaveForm.$valid', function (Valid) {
        $scope.IsfrmEmployeeLeaveForm = Valid;
    });
    $scope.onSaveEmployeeLeave = function (employeeLeaveForm) {
        //if (employeeLeaveForm.FromDate != null && employeeLeaveForm.ToDate != "" && employeeLeaveForm.EmployeeName != null && employeeLeaveForm.EmployeeName != "") {
        if($scope.IsfrmEmployeeLeaveForm){
            employeeLeaveForm.Status = "Applied";
            EmployeeLeave.SaveEmployeeLeave(employeeLeaveForm).then(function (response) {
                if (response.data && response.data.sucess == true) {
                    growlService.growl("Saved Successfully", 'success');
                    $scope.EmployeeLeaveForm = {
                        BranchID: UtilityFunc.BranchId(),
                        FromDate: moment(),
                        ToDate: moment(),
                    }
                }
            })
        }
        else {
            growlService.growl("Please Enter All Mandatory Fields",'danger')
        }
    }
    /*save Section*/
    /*Clear Section*/
    $scope.OnClearEmployeeLeave = function (employeeLeaveForm) {
        $scope.EmployeeLeaveForm = "";
    };
    /*Clear Section*/
    $scope.init();
}]);