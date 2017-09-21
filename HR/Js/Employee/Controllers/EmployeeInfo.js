angular.module('ngHR').controller('EmployeeInfoController', ['$scope', '$http', 'growlService', '$filter', 'UtilityFunc', 'LookUp','EmployeeProfileService',
    function ($scope, $http, growlService, $filter, UtilityFunc, LookUp, EmployeeProfileService) {

        $scope.init = function () {
            $scope.EmployeeInfo = {
                editInfo: 0,
                editContact: 0,
                editAddress: 0,
                editResetPassword: 0
            }
            $scope.dateFormat = UtilityFunc.DateFormat();
        }

        LookUp.GetCountries().then(function (res) {
            $scope.Countries = res.data.countries;
            $scope.EmployeeInfo.Nationality =
                $filter('filter')($scope.Countries, { 'CountryCode': 'SG' })[0].Id;
        }, function (err) {
        })
        $scope.IsfrmPersonalInfo = false;
        $scope.$watch('frmPersonalInfo.$valid', function (Valid) {
            $scope.IsfrmPersonalInfo = Valid;
        });
        $scope.SavePersonalInfo = function (EmployeeHeader) {
            if (IsfrmPersonalInfo) {
                EmployeeProfileService.SaveEmployeeHeader(EmployeeHeader).then(function (response) {
                    if (response.data && response.data.sucess == true) {
                        growlService.growl(response.data.message, 'success');
                    }
                })
            }
        }
        $scope.IsfrmAddressInfo = false;
        $scope.$watch('frmAddressInfo.$valid', function (Valid) {
            $scope.IsfrmAddressInfo = Valid;
        });
        $scope.SaveEmployeeAddress = function (EmployeeAddress) {
            if (IsfrmAddressInfo) {
                EmployeeProfileService.SaveEmployeeAddress(EmployeeHeader).then(function (response) {
                    if (response.data && response.data.sucess == true) {
                        growlService.growl(response.data.message, 'success');
                    }
                })
            }
        }

        $scope.IsfrmUserInfo = false;
        $scope.$watch('frmUserInfo.$valid', function (Valid) {
            $scope.IsfrmAddressInfo = Valid;
        });
        $scope.SaveEmployeeUser = function (EmployeeUser) {
            if (IsfrmAddressInfo) {
                EmployeeProfileService.SaveEmployeeUser(EmployeeUser).then(function (response) {
                    if (response.data && response.data.sucess == true) {
                        growlService.growl(response.data.message, 'success');
                    }
                })
            }
        }

        $scope.init();
    }])