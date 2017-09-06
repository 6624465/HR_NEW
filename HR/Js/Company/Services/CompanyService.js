app.service('CompanyService', ['$http', '$q', function ($http, $q) {

    this.GetCopmanyDetails = function () {
        var deferred = $q.defer();
        $http.get('/Company/Company/GetCopmanyDetails').then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;
    }

    this.GetCountries = function () {
        var deferred = $q.defer();
        $http.get('/Company/Company/GetCountries').then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;
    }

    this.SaveCompany = function (companyDetails) {
        var deferred = $q.defer();
        $http.post('/Company/Company/SaveCompany', companyDetails).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;
    }
    this.SaveBranch = function (branchDetails) {
        var deferred = $q.defer();
        $http.post('/Company/Company/SaveBranch', branchDetails).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        })
        return deferred.promise;
    }

}])