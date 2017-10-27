app.service('EmployeeProfileService', ['$http', '$q', 'UtilityFunc', function ($http, $q, UtilityFunc) {
    this.SaveEmlployee = function (EmployeeDetails, files, EmployeeDocument) {
        var deferred = $q.defer();
        var form = new FormData();
        debugger
        angular.forEach(files, function (val) {
            form.append("file", val);
        });
        //form.append('file', files);
        form.append('EmployeeDocument', JSON.stringify(EmployeeDocument));
        form.append('EmployeeDetails', JSON.stringify(EmployeeDetails));

        var objXhr = new XMLHttpRequest();
        objXhr.onreadystatechange = function () {
            if (objXhr.readyState == 4) {
                deferred.resolve('Success');
            }
        };

        objXhr.onerror = function () {
            deferred.reject('Error');
        };

        objXhr.open('POST', "/Employees/EmployeeProfile/SaveEmlployee");
        objXhr.send(form);
        return deferred.promise;
    }

    this.GetEmployeeDetails = function (searchViewModel) {
        var deferred = $q.defer();
        $http.post('/Employees/EmployeeProfile/GetEmployeeDetails', JSON.stringify(searchViewModel)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetEmployeeById = function (id, IsfromIndividualEmployee) {
        var deferred = $q.defer();
        $http.get('/Employees/EmployeeProfile/GetEmployeeById?employeeId=' + id + '&&IsfromIndividualEmployee=' + IsfromIndividualEmployee).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.GetEmployeeNumber = function () {
        var deferred = $q.defer();
        $http.get('/Employees/EmployeeProfile/GetEmployeeNumber').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.SaveEmployeeHeader = function (EmployeeHeader) {

        var deferred = $q.defer();
        $http.post("/Employees/EmployeeProfile/SaveEmployeeHeader", EmployeeHeader).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.SaveEmployeeAddress = function (EmployeeAddress) {

        var deferred = $q.defer();
        $http.post("/Employees/EmployeeProfile/SaveAddressDetails", EmployeeAddress).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.SaveEmployeeUser = function (EmployeeUser, employeeId) {

        var deferred = $q.defer();
        $http.post("/Employees/EmployeeProfile/SaveEmployeeUser", JSON.stringify({ EmployeeUser, employeeId })).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.SaveEmployeeDocuments = function (file, employeeId) {
        debugger
        var deferred = $q.defer();
        var form = new FormData();
            form.append("file", file);
        //form.append('file', file);
        form.append('employeeId', employeeId);

        var objXhr = new XMLHttpRequest();
        objXhr.onreadystatechange = function () {
            if (objXhr.readyState == 4) {
                deferred.resolve('Success');
            }
        };

        objXhr.onerror = function () {
            deferred.reject('Error');
        };

        objXhr.open('POST', "/Employees/EmployeeProfile/SaveEmployeeDocuments");
        objXhr.send(form);
        return deferred.promise;
        //var deferred = $q.defer();
        //$http.post("/Employees/EmployeeProfile/SaveEmployeeDocuments", JSON.stringify({ fileName, employeeId })).then(function (res) {
        //    deferred.resolve(res);
        //}, function (err) {
        //    deferred.reject(err);
        //});
        //return deferred.promise;

    }

    this.GetEmployees = function (employeeName) {
        var deferred = $q.defer();
        $http.get("/EmployeeLeave/GetEmployeeList?employeeName=" + employeeName).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);