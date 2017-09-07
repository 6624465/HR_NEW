var app = angular.module('loginApp', ['angular-growl'])


app.config(function (growlProvider) {
    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalTimeToLive({ success: 4000, error: 2000, warning: 3000, info: 4000 });
})
app.controller('loginController', ['$scope', '$http', 'LoginService', 'growl', 'growlService', '$timeout', function ($scope, $http, LoginService, growl, growlService,$timeout) {
    debugger;
    $scope.init = function () {
        $scope.IsEnable = true;
    }
    $scope.login = function () {
        if ($scope.UserName != null && $scope.Password != null){
        $scope.showLoading = true;
        $scope.IsEnable = false;
    }
        var user = { "UserName": $scope.UserName, "Password": $scope.Password };
        LoginService.LogIn(user).then(function (response) {
            debugger;
            if (response && response.data && response.data.success == true) {
                $scope.showLoading = false;
                $scope.IsEnable = true;
                sessionStorage.setItem('User', JSON.stringify(response.data.SessionObject));
                location.href = "Home/index/";
            }
        })
    }
}]);