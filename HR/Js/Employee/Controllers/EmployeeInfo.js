angular.module('ngHR').controller('EmployeeInfoController', ['$scope', '$http', 'growlService', '$filter', 'UtilityFunc', 'LookUp', 'EmployeeProfileService',
    function ($scope, $http, growlService, $filter, UtilityFunc, LookUp, EmployeeProfileService) {

        $scope.init = function () {
            $scope.employeeId = 0;
            $scope.EmployeeInfo = {
                editInfo: 0,
                editContact: 0,
                editAddress: 0,
                editResetPassword: 0
            }
            $scope.EmployeeHeader = {
                BranchId: UtilityFunc.BranchId(),
                EmployeePersonalInfo: {
                    BranchId: UtilityFunc.BranchId(),
                },
            }
            $scope.EmployeeUser = {
                BranchId: UtilityFunc.BranchId(),
            }
            $scope.EmployeeWorkDetails = {},
            $scope.EmployeeAddress = {}

            $scope.dateFormat = UtilityFunc.DateFormat();
        }

        $scope.formatDate = function (date) {
            if (date != null)
                return moment(date).format(UtilityFunc.DateFormat());
            else
                return null;
        }

        $scope.employeeId = 0;
        EmployeeProfileService.GetEmployeeById($scope.employeeId, true).then(function (response) {
            if (response && response.data) {
                $scope.EmployeeHeader = response.data;
                $scope.EmployeeUser = $scope.EmployeeHeader.User;
                $scope.EmployeeWorkDetail = $scope.EmployeeHeader.EmployeeWorkDetail;
                $scope.EmployeeAddress = $scope.EmployeeHeader.Address;

                if ($scope.EmployeeWorkDetail.JoiningDate && $scope.EmployeeWorkDetail.JoiningDate != null) {
                    $scope.EmployeeWorkDetail.JoiningDate = moment($scope.EmployeeWorkDetail.JoiningDate);
                }
                else {
                    $scope.EmployeeWorkDetail.JoiningDate = undefined;
                }
                if ($scope.EmployeeHeader.EmployeePersonalInfo.DOB && $scope.EmployeeHeader.EmployeePersonalInfo.DOB != null) {
                    $scope.EmployeeHeader.EmployeePersonalInfo.DOB = moment(response.data.EmployeePersonalInfo.DOB);
                }
                else {
                    $scope.EmployeeHeader.EmployeePersonalInfo.DOB = undefined;
                }
                if ($scope.EmployeeHeader.EmployeePersonalInfo.MarriageDate && $scope.EmployeeHeader.EmployeePersonalInfo.MarriageDate != null) {
                    $scope.EmployeeHeader.EmployeePersonalInfo.MarriageDate = moment(response.data.EmployeePersonalInfo.MarriageDate);
                }
                else {
                    $scope.EmployeeHeader.EmployeePersonalInfo.MarriageDate = undefined;
                }
                if ($scope.EmployeeWorkDetail.ConfirmationDate && $scope.EmployeeHeader.ConfirmationDate != null) {
                    $scope.EmployeeWorkDetail.ConfirmationDate = moment($scope.EmployeeWorkDetail.ConfirmationDate);
                }
                else {
                    $scope.EmployeeWorkDetail.ConfirmationDate = undefined;
                }
            }
        })

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
        $scope.$watch('frmContactAddressInfo.$valid', function (Valid) {
            $scope.IsfrmAddressInfo = Valid;
        });
        $scope.IsfrmAddressInfo = false;
        $scope.$watch('frmAddressInfo.$valid', function (Valid) {
            $scope.IsfrmAddressInfo = Valid;
        });
        $scope.SaveEmployeeAddress = function (EmployeeAddress) {
            if (IsfrmAddressInfo || IsfrmAddressInfo) {
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