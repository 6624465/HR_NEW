var app = angular.module('loginApp', ['angular-growl'])
app.config(function (growlProvider) {
    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalTimeToLive({ success: 4000, error: 2000, warning: 3000, info: 4000 });
})
app.controller('loginController', ['$scope', '$http', 'LoginService', 'growlService', function ($scope, $http, LoginService, growlService) {
    $scope.init = function () {
        $scope.IsEnable = false;
    }
    $scope.login = function () {
        if ($scope.UserName != null && $scope.Password != null) {
            $scope.showLoading = true;
            $scope.IsEnable = true;
        }
        var user = { "UserName": $scope.UserName, "Password": $scope.Password };
        LoginService.LogIn(user).then(function (response) {
            if (response && response.data && response.data.success == true) {
                //$scope.showLoading = false;
                $scope.IsEnable = false;
                sessionStorage.setItem('authenticatedUser', JSON.stringify(response.data.SessionObject));
                location.href = "/Home/Index/";
                //$scope.showLoading = false;
            }
            else {
                $scope.showLoading = false;
                growlService.growl(response.data.message, 'danger');
            }
        })
    }
}]);