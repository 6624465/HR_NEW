var app = angular.module('loginApp', ['ui.bootstrap', 'angular-growl', 'ui.router', 'oc.lazyLoad'])

app.config(function ($stateProvider, growlProvider, $urlRouterProvider, $httpProvider, $ocLazyLoadProvider) {
    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalTimeToLive({ success: 4000, error: 2000, warning: 3000, info: 4000 });

    $stateProvider
           .state('Home', {
               url: '/Home',
               templateUrl: 'Js/Home/Views/index.html',
               //resolve: {
               //    loadPlugin: function ($ocLazyLoad) {
               //        return $ocLazyLoad.load([
               //            {
               //                name: 'ngHR',
               //                files: [baseUrl + 'Js/Home/Controllers/HomeController.js']
               //            }
               //        ]);
               //    }
               //}
           })
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
app.controller('loginController', ['$scope', '$http', 'LoginService', 'growl', 'growlService', '$timeout', 'focus','$state',
    function ($scope, $http, LoginService, growl, growlService, $timeout, focus, $state) {
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
                    debugger
                    sessionStorage.setItem('authenticatedUser', JSON.stringify(response.data.SessionObject));
                    sessionStorage.setItem('SECURABLES', JSON.stringify(response.data.securables));
                    location.href = "Home/index/";
                }
                else {
                    $scope.showLoading = false;
                    $scope.IsEnable = false;
                    growlService.growl("Sorry, your login information is incorrect.", 'danger');
                    $scope.User = {};
                    focus('UserName');
                }
            }, function (err) { });
        }
    }
    $scope.init();
}]);