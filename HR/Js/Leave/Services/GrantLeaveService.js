app.service('GrantLeaveService', ['$http', '$q', function ($http, $q) {
    this.SaveGrantLeaves = function (LeaveHeader) {
        var deferred = $q.defer();
        $http.post("/GrantLeave/SaveGrantLeaves", LeaveHeader).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetGrantLeaves = function () {
        var deferred = $q.defer();
        $http.post("/GrantLeave/GetGrantLeaves").then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}])