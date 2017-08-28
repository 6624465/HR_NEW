angular.module('ngHR').controller('EmployeeLeaveFormController', ['$scope', '$http','UtilityFunc', 'growlService','limitToFilter','EmployeeLeave',
function ($scope, $http, UtilityFunc, growlService, limitToFilter, EmployeeLeave) {
   
    $scope.init = function () {
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.EmployeeLeaveForm = {}
        $scope.maxdate = moment();
        $scope.formats = ['DD/MM/YYYY'];
        $scope.format = $scope.formats[0];
    };

    $scope.openCalendar = function (e, picker) {
        that[picker].open = true;
    };

  
    $scope.EmployeeList = function (text) {
        debugger;
        return EmployeeLeave.GetEmployees(text).then(function (response) {
            debugger;
            return limitToFilter(response.data.employies, 15);
        }, function (err) { });
    };

    $scope.EmployeeSelected = function (obj) {
        $scope.EmployeeLeaveForm.EmployeeId = obj.id;
        $scope.EmployeeLeaveForm.EmployeeName = obj.EmployeeName;
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