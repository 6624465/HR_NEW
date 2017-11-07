app.service('DashBoardService', ['$http', '$q', 'UtilityFunc', function ($http, $q, UtilityFunc) {

    this.GetRegionWiseEmployees = function () {
        var deferred = $q.defer();
        $http.post('/Home/GetRegionWiseEmployees').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetGenderWiseEmployees = function () {
        var deferred = $q.defer();
        $http.post('/Home/GetGenderWiseEmployees').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}])