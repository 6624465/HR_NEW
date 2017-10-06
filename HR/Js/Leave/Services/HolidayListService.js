app.service('HolidayListService', ['$http', '$q', 'UtilityFunc', function ($http, $q, UtilityFunc) {

    this.GetBranchLocations = function () {
        var deferred = $q.defer();
        $http.get("/SetUp/GetBranchLocation").then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetHolidayList = function () {
        var deferred = $q.defer();
        $http.get('/SetUp/GetHolidayList').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.SaveHolidayList = function (holidayList) {
        var deferred = $q.defer(); 
        $http.post("/SetUp/SaveHolidayListData", holidayList).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

}])