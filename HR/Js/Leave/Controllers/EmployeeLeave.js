angular.module('ngHR').controller('EmployeeLeaveFormController', ['$scope', '$http','UtilityFunc', 'growlService','limitToFilter','EmployeeLeave',
function ($scope, $http, UtilityFunc, growlService, limitToFilter, EmployeeLeave) {
    $scope.minDate = new Date()
    $scope.options = {
        format: 'dd/mm/yyyy',
        min: $scope.minDate,
        max: new Date($scope.minDate.getFullYear() + 1, $scope.minDate.getMonth(), $scope.minDate.getDate())
    }
    
    $scope.init = function () {
        $scope.DateFormat = UtilityFunc.DateFormat();
        $scope.EmployeeLeaveForm={}
    };
    $scope.date = function () {
        debugger;
        var sample = $scope.EmployeeLeaveForm.FromDate;
        $scope.EmployeeLeaveForm.FromDate = sample;
    };

    $scope.picker1 = function () {
        debugger
        date: new Date(),
        datepickerOptions= {
            showWeeks: false,
            startingDay: 1,
            dateDisabled: function (data) {
                return (data.mode === 'day' && (new Date().toDateString() == data.date.toDateString()));
            }
        }
    };

    $scope.openCalendar = function (e, picker) {
        debugger
        that[picker].open = true;
    };

    $scope.open = function ($event, $element) {
        debugger
        var element=$('#fromDate');
        $event.preventDefault();
        $event.stopPropagation();
        DatetimePicker.open({
            triggerEl: element[0],
            dateFormat: attrs.dateFormat,
            ngModel: attrs.ngModel,
            year: attrs.year,
            month: attrs.month,
            day: attrs.day,
            hour: attrs.hour,
            minute: attrs.minute,
            dateOnly: attrs.dateOnly,
            futureOnly: attrs.futureOnly,
            closeOnSelect: attrs.closeOnSelect
        });
        $scope.startDateOpened = true;
    };
    $scope.EmployeeList = function (text) {
        return EmployeeLeave.GetEmployees(text).then(function (response) {
            return limitToFilter(response.data.employies, 15);
        }, function (err) { });
    };
    $scope.EmployeeSelected = function (obj) {
        $scope.EmployeeLeaveForm.EmployeeId = obj.id;
        $scope.EmployeeLeaveForm.EmployeeName = obj.EmployeeName;
    }
    $scope.formatDate = function (date) {
        if (date != null)
            return moment(date).format(UtilityFunc.DateFormat());
        else
            return null;
    }
    $scope.onSaveEmployeeLeave = function (employeeLeaveForm) {
        debugger
        EmployeeLeave.SaveEmployeeLeave(employeeLeaveForm).then(function (response) {
            if (response.data && response.data.sucess == true) {
                growlService.growl(response.data.message, 'success');
            }
        })
    }
}]);