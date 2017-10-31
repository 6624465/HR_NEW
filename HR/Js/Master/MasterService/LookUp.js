app.service('LookUp', ['$http', '$q', function ($http, $q) {
    this.SaveLookUpData = function (lookUpTypeObj) {
        var deferred = $q.defer();
        $http.post("/Settings/LookUp/SaveLookUp", lookUpTypeObj).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetLookUpData = function (lookupcode) {
        var deferred = $q.defer();
        $http.get("/Settings/LookUp/GetLookUp?LookUpCategory=" + lookupcode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetActiveLookUpData = function (lookUpCode) {
        var deferred = $q.defer();
        $http.get("/Settings/LookUp/GetActiveLookUp?LookUpCategory=" + lookUpCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
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

    this.GetTableData = function (obj) {
        var deferred = $q.defer();
        $http.post("/Settings/LookUp/GetTableData", JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }



}])