angular.module('ngHR').controller('EmployeeProfileController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc', 'LookUp', 'HolidayListService', 'growlService', 'EmployeeProfileService',
    'growlService', function ($scope, $http, growl, $filter, UtilityFunc, LookUp, HolidayListService, growlService, EmployeeProfileService) {

        $scope.init = function () {
            $scope.EmployeeHeader = {
                BranchId: UtilityFunc.BranchId,
                Address: {},
                EmployeePersonalInfo: {
                    BranchId: UtilityFunc.BranchId,
                },
                EmployeeWorkDetail: {
                        BranchId: UtilityFunc.BranchId
                },
                EmployeeDocument: {
                        BranchId: UtilityFunc.BranchId
            }
        };
        $scope.dateFormat = UtilityFunc.DateFormat();
    }
        $scope.detailsUrl = baseUrl + 'Js/Employee/Templates/BasicInformation.html';
        $scope.LookUpData = function () {
            LookUp.GetActiveLookUpData("EmployeeType").then(function (response) {
                $scope.EmployeeTypeList = response.data.lookUpLists;
        })
            LookUp.GetActiveLookUpData("EmployeeStatus").then(function (response) {
                $scope.EmployeeStatusList = response.data.lookUpLists;
        })
            LookUp.GetActiveLookUpData("EmployeeDesignation").then(function (response) {
                $scope.EmployeeDesignation = response.data.lookUpLists;
        })
            LookUp.GetActiveLookUpData("EmployeeDepartment").then(function (response) {
                $scope.EmployeeDepartment = response.data.lookUpLists;
        })
            LookUp.GetActiveLookUpData("PaymentType").then(function (response) {
                $scope.PaymentType = response.data.lookUpLists;
        })
    }

        $scope.BranchLocations = function () {
            HolidayListService.GetBranchLocations().then(function (response) {
                if (response.data && response.data.success == true) {
                    $scope.Locations = response.data.BranchLocations;
                }
                else
                    growlService.growl("Error Occured.", 'danger');
            }, function (err) {
                growlService.growl(err, 'danger');

        })
    };

        $scope.IsfrmEmployeeProfile = false;
        $scope.$watch('EmployeeProfile.$valid', function (Valid) {
            $scope.IsfrmEmployeeProfile = Valid;
    });
        $scope.processForm = function (EmployeeHeader) {
            debugger
            if ($scope.IsfrmEmployeeProfile) {
                EmployeeProfileService.SaveEmlployee(EmployeeHeader).then(function (response) {
                    if (response.data && response.data.success == true) {
                        growlService.growl(response.data.message, 'success');
                }
            })
            }
            else {
                growlService.growl('Please Enter All Mandtory Fields', 'danger');
        }
    }
        LookUp.GetCountries().then(function (res) {
            $scope.Countries = res.data.countries;
            $scope.EmployeeHeader.Address.CountryId =
                $filter('filter') ($scope.Countries, { 'CountryCode': 'SG' })[0].Id;
        }, function (err) {
    })

        $scope.LookUpData();
        $scope.BranchLocations();
        $scope.init();
}])

