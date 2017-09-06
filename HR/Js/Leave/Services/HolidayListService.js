app.service('HolidayListService', ['$http', '$q', 'UtilityFunc', function ($http, $q, UtilityFunc) {

    this.GetBranchLocations = function () {
        var branchId = UtilityFunc.BranchId();
        var deferred = $q.defer();
        $http.get("/SetUp/GetBranchLocation?branchId=" + branchId).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetHolidayList = function (countryId) {
        var branchId = UtilityFunc.BranchId();
        var deferred = $q.defer();
        $http.get('/SetUp/GetHolidayList?countryId=' + countryId + '&&branchId=' + branchId).then(function (res) {
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