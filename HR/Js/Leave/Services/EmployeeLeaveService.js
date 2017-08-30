app.service('EmployeeLeave', ['$http', '$q', 'UtilityFunc', function ($http, $q, UtilityFunc) {
    this.GetEmployees = function (employeeName) {
        debugger;
        var branchId = UtilityFunc.BranchId();///add branchid parameter later
        var deferred = $q.defer();
        $http.get("/EmployeeLeave/GetEmployeeList?employeeName=" + employeeName).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.SaveEmployeeLeave = function (employeeLeave) {
        var deferred = $q.defer();
        $http.post('/EmployeeLeave/SaveEmployeeLeaveForm', employeeLeave).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;
    }

    this.GetEmployeeLeaveListBasedOnTeamLead = function (teamLeadId) {
        var deferred = $q.defer();
        $http.get("/AppliedLeaveList/GetAppliedLeaveList?teamLeadId=" + teamLeadId).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);