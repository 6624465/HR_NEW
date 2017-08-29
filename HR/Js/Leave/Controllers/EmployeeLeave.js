angular.module('ngHR').controller('EmployeeLeaveFormController', ['$scope', '$http','UtilityFunc', 'growlService','limitToFilter','EmployeeLeave',
function ($scope, $http, UtilityFunc, growlService, limitToFilter, EmployeeLeave) {
   
    $scope.init = function () {
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.EmployeeLeaveForm = {
            FromDate: moment(),
            ToDate:moment(),
        }
        $scope.maxdate = moment();
        datepickerOptions: {
            minDate: moment();
        }
        //$scope.formats = ['DD/MM/YYYY'];
        //$scope.format = $scope.formats[0];
    };

    //$scope.openCalendar = function (e, picker) {
    //    that[picker].open = true;
    //};

  
    $scope.EmployeeList = function (text) {
        return EmployeeLeave.GetEmployees(text).then(function (response) {
            return limitToFilter(response.data.employies, 15);
        }, function (err) { });
    };

    $scope.EmployeeSelected = function (obj) {
        $scope.EmployeeLeaveForm.EmployeeId = obj.id;
        $scope.EmployeeLeaveForm.EmployeeName = obj.EmployeeName;
    }
    $scope.difference = function (fromDate, toDate) {
        if (fromDate && toDate) {
            $scope.EmployeeLeaveForm.Days= Math.round(Math.abs((new Date(fromDate).getTime() - new Date(toDate).getTime()) / (24 * 60 * 60 * 1000)));
        }
    }
    $scope.onChangeToDate = function () {
        debugger
        ToDate = $scope.EmployeeLeaveForm.ToDate;
        $scope.EmployeeLeaveForm.FromDate;
        $scope.EmployeeLeaveForm.Days = moment($scope.EmployeeLeaveForm.ToDate).diff(moment($scope.EmployeeLeaveForm.FromDate), 'days')
        //var days = UtilityFunc.DateFormat($scope.EmployeeLeaveForm.ToDate) - UtilityFunc.DateFormat($scope.EmployeeLeaveForm.FromDate);
    }

 /*Save Section*/
    $scope.onSaveEmployeeLeave = function (employeeLeaveForm) {
        EmployeeLeave.SaveEmployeeLeave(employeeLeaveForm).then(function (response) {
            if (response.data && response.data.sucess == true) {
                growlService.growl(response.data.message, 'success');
            }
        })
    }
    /*save Section*/
    /*Clear Section*/
    $scope.OnClearEmployeeLeave = function (employeeLeaveForm) {
        $scope.EmployeeLeaveForm = "";
    };
    /*Clear Section*/
    $scope.init();
}]);