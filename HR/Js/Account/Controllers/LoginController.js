var app = angular.module('loginApp', ['angular-growl'])


app.config(function (growlProvider) {
    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalTimeToLive({ success: 4000, error: 2000, warning: 3000, info: 4000 });
})

app.directive('focusOn', function () {
    return function (scope, elem, attr) {
        scope.$on('focusOn', function (e, name) {
            if (name === attr.focusOn) {
                elem[0].focus();
            }
        });
    };
});

app.factory('focus', function ($rootScope, $timeout) {
    return function (name) {
        $timeout(function () {
            $rootScope.$broadcast('focusOn', name);
        });
    }
});
app.controller('loginController', ['$scope', '$http', 'LoginService', 'growl', 'growlService', '$timeout', 'focus',
    function ($scope, $http, LoginService, growl, growlService, $timeout, focus) {
        focus('UserName');
    $scope.init = function () {
        $scope.IsEnable = false;
        $scope.User = {}
    }
    $scope.login = function () {
        if ($scope.User.UserName != null && $scope.User.Password != null) {
            $scope.showLoading = true;
            $scope.IsEnable = true;
            LoginService.LogIn($scope.User).then(function (response) {
                if (response && response.data && response.data.success == true) {
                    $scope.showLoading = false;
                    sessionStorage.setItem('authenticatedUser', JSON.stringify(response.data.SessionObject));
                    sessionStorage.setItem('SECURABLES', JSON.stringify(response.data.securables));
                    debugger;
                    location.href = "Home/index/";
                }
                else {
                    $scope.showLoading = false;
                    $scope.IsEnable = false;
                    growlService.growl("Sorry, your login information is incorrect.", 'danger');
                    $scope.User = {};
                    focus('UserName');
                }
            })
        }
    }
    $scope.init();
}]);