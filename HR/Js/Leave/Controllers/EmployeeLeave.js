angular.module('ngHR').controller('EmployeeLeaveFormController', ['$scope', '$http', 'UtilityFunc', 'growlService', 'limitToFilter', 'EmployeeLeave', 'LookUp',
function ($scope, $http, UtilityFunc, growlService, limitToFilter, EmployeeLeave, LookUp) {
    debugger;
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
        $scope.employeeName = UtilityFunc.Employeename();
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
    $scope.GetLeaveStatus = function () {
        debugger;
        EmployeeLeave.GetLeaveStatus().then(function (res) {
            debugger;
            $scope.appliedStatusCount = res.data.appliedStatusCount;
            $scope.GrantedStatusCount = res.data.GrantedStatusCount;
            $scope.PendingStatusCount = res.data.PendingStatusCount;
            $scope.RemaingStatusCount = res.data.RemaingStatusCount;
        });
    }
    $scope.GetLeaveStatus();
    //$scope.difference = function () {
    //    //var diffDate = (Math.round(Math.abs((new Date($scope.EmployeeLeaveForm.FromDate).getTime() -new Date($scope.EmployeeLeaveForm.ToDate).getTime()) / (24  60  60 * 1000))));
    //    //    $scope.EmployeeLeaveForm.Days = diffDate +1;
    //    var date1 = new Date($scope.EmployeeLeaveForm.FromDate).getDate();
    //    var date2 = new Date($scope.EmployeeLeaveForm.ToDate).getDate();
    //    $scope.dayDifference = date2 - date1;
    //    if (date1 != date2) {
    //        $scope.EmployeeLeaveForm.Days = $scope.dayDifference + 1;
    //    }
    //    else {
    //        $scope.EmployeeLeaveForm.Days = 1;
    //    }
    //}
    $scope.difference = function (FromDate, ToDate) {
        var date1 = new Date($scope.EmployeeLeaveForm.FromDate);
        var date2 = new Date($scope.EmployeeLeaveForm.ToDate);
        var iWeeks, iDateDiff, iAdjust = 0;
        if (date2 < date1) return -1; // error code if dates transposed
        var iWeekday1 = date1.getDay(); // day of week
        var iWeekday2 = date2.getDay();
        iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1; // change Sunday from 0 to 7
        iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;
        if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1; // adjustment if both days on weekend
        iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1; // only count weekdays
        iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;

        // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
        iWeeks = Math.floor((date2.getTime() - date1.getTime()) / 604800000)

        if (iWeekday1 <= iWeekday2) {
            iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
        } else {
            iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
        }

        iDateDiff -= iAdjust // take into account both days on weekend

        // return(iDateDiff + 1) - $scope.CasualHolidayListCount;
        FromDate = moment(FromDate).format('MM/DD/YYYY');
        ToDate = moment(ToDate).format('MM/DD/YYYY');
        EmployeeLeave.GetCasualHolidayListCount(FromDate, ToDate).then(function (res) {
            $scope.CasualHolidayListCount = res.data;
            var result = (iDateDiff + 1) - $scope.CasualHolidayListCount;
            $scope.EmployeeLeaveForm.Days = result;
        });
        //var result = (iDateDiff + 1) - $scope.CasualHolidayListCount;
        //$scope.EmployeeLeaveForm.Days = result;
    }
    /*Save Section*/
    $scope.IsfrmEmployeeLeaveForm = false;
    $scope.$watch('frmEmployeeLeaveForm.$valid', function (Valid) {
        $scope.IsfrmEmployeeLeaveForm = Valid;
    });
    $scope.onSaveEmployeeLeave = function (employeeLeaveForm) {
        //if (employeeLeaveForm.FromDate != null && employeeLeaveForm.ToDate != "" && employeeLeaveForm.EmployeeName != null && employeeLeaveForm.EmployeeName != "") {
        if ($scope.IsfrmEmployeeLeaveForm) {
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
            growlService.growl("Please Enter All Mandatory Fields", 'danger')
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