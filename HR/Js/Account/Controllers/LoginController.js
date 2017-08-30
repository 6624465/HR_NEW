var app = angular.module('loginApp', ['angular-loading-bar',
])
  .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
      cfpLoadingBarProvider.includeBar = false;
  }])
app.controller('loginController', ['$scope', '$http', 'LoginService', 'cfpLoadingBar', function ($scope, $http, LoginService, cfpLoadingBar) {
    $scope.login = function () {
        cfpLoadingBar.start();
        var user = { "UserName": $scope.UserName, "Password": $scope.Password };
        LoginService.LogIn(user).then(function (response) {
            if (response && response.data && response.data.success == true) {
                cfpLoadingBar.complete();
                sessionStorage.setItem('User', JSON.stringify(response.data.SessionObject));
                location.href = "/Home/Index/";
            }
        })
    }
}]);