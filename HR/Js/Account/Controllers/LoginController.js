var app = angular.module('loginApp', [])
app.controller('loginController', ['$scope', '$http', 'LoginService', function ($scope, $http, LoginService) {
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
            if (response && response.data && response.data.success == true) {
                $scope.showLoading = false;
                $scope.IsEnable = true;
                sessionStorage.setItem('User', JSON.stringify(response.data.SessionObject));
                location.href = "/Home/Index/";
            }
        })
    }
}]);