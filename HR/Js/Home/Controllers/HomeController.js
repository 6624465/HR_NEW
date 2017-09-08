angular.module('ngHR').controller('HomeController', ['$scope', 'growlService', function ($scope, growlService) {
    $scope.Message = 'Welcome';
    growlService.growl("Welcome To HR.", 'success');
}]);