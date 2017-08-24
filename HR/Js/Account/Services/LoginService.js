app.service('LoginService', ['$http', '$q', function ($http, $q) {
    this.LogIn = function (user) {
        var deferred = $q.defer();
        $http.post("/Login/LogOn", user).then(function (response) {
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}])