var app = angular.module('loginApp', []);
app.controller('loginController', ['$scope', '$http', 'LoginService', function ($scope, $http, LoginService) {
    $scope.login = function () {
        var user = { "UserName": $scope.UserName, "Password": $scope.Password };
        LoginService.LogIn(user).then(function (response) {
            if (response && response.data && response.data.success == true) {
                sessionStorage.setItem('User', JSON.stringify(response.data.SessionObject));
                location.href = "/Home/Index/";
            }
        })
    }
}]);
