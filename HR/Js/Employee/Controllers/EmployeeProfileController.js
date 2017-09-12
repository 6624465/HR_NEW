angular.module('ngHR').controller('EmployeeProfileController', ['$scope', '$http', 'growl', '$filter',
    'UtilityFunc', 'Employee', 'LookUp', 'HolidayListService', 'growlService', 'EmployeeProfileService','$timeout',
    'growlService', function ($scope, $http, growl, $filter, UtilityFunc,Employee, LookUp, HolidayListService, growlService, EmployeeProfileService,$timeout) {

        $scope.init = function () {
            debugger
            $scope.employeeDetails = {};
            $scope.AddressNextButton = false;
            $scope.BasicNextButton = false;
            $scope.PositionNextButton = false;
            $scope.EmployeeHeader = {
                BranchId: UtilityFunc.BranchId(),
                Address: {},
                EmployeePersonalInfo: {
                    BranchId: UtilityFunc.BranchId(),
                },
                EmployeeWorkDetail: {
                    BranchId: UtilityFunc.BranchId(),
                    Designation: null,
                    Department: null
                },
                EmployeeDocument: {
                    BranchId: UtilityFunc.BranchId()
                }

            };
            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.IsfrmEmployeeProfile = false;
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

        $scope.$watch('EmployeeProfile.$valid', function (Valid) {
            $scope.IsfrmEmployeeProfile = Valid;
        });

        $scope.onChangeText = function (value) {
            if (value == '' || value == null) {
                $scope.IsValid = false
            }
        }

        $scope.processForm = function (EmployeeHeader) {
            debugger
                $scope.ValidateForm();
            if ($scope.IsfrmEmployeeProfile) {
                if ($scope.IsValid) {
                    if (EmployeeHeader.Address.length > 0) {
                        $scope.AddressNextButton = true;
                    }
                    if (EmployeeHeader.EmployeeWorkDetail.Designation != null || EmployeeHeader.EmployeeWorkDetail.Department != null) {
                        $scope.PositionNextButton = true;
                    }
                    if (EmployeeHeader.FirstName != null) {
                        $scope.BasicNextButton = true
                    }
                    EmployeeProfileService.SaveEmlployee(EmployeeHeader).then(function (response) {
                        if (response.data && response.data.success == true) {
                            growlService.growl(response.data.message, 'success');
                        }
                    })
                }
            }
            //else {
            //    var mandtoryFields = angular.element('.valid');
            //    angular.forEach(mandtoryFields, function (val) {
            //        if (val.value == "")
            //            val.style.borderBottom = "1px solid red";
            //        else
            //            val.style.borderBottom = '';
            //    })
            //    growlService.growl('Please Enter All Mandtory Fields', 'danger');
            //}
            }

        $scope.ValidateForm = function () {
            $scope.IsValid = false;
            var errorCount = 0;
            var mandtoryFields = angular.element('.valid');
            angular.forEach(mandtoryFields, function (val) {
                if (val.value == "") {
                    val.style.borderBottom = "1px solid red";
                    errorCount++;
                }
                else 
                    val.style.borderBottom = '';
            })
            if (errorCount >= 1)
            growlService.growl('Please Enter All Mandtory Fields', 'danger');
            else
                $scope.IsValid = true;
        }

        LookUp.GetCountries().then(function (res) {
            $scope.Countries = res.data.countries;
            $scope.EmployeeHeader.Address.CountryId =
                $filter('filter')($scope.Countries, { 'CountryCode': 'SG' })[0].Id;
        }, function (err) {
        })

        $scope.AddNewEmployeeDetails = function () {
            location.href = "/Home/index/#/EmployeeHeader";
        }

        $scope.onEditEmployeeDesignation = function (employeeDetails) {
            location.href = "/Home/index/#/EmployeeHeader";
            
            EmployeeProfileService.GetEmployeeById(employeeDetails.EmployeeId).then(function (response) {
                if (response && response.data) {
                    //$scope.EmployeeHeader = response.data;
                    //Employee.set(response.data);
                    
                    //$timeout(function () {
                        $scope.EmployeeHeaders = response.data;
                    //},1500);
                }
            })

            
        }

        $scope.GetEmployeeDetails = function () {
            EmployeeProfileService.GetEmployeeDetails().then(function (response) {
                if (response && response.data)
                    $scope.EmployeeDetailsList = response.data.employees;
            });
        }
        /*EmployeeDetailsList*/
        $scope.GetEmployeeDetails();
        $scope.LookUpData();
        $scope.BranchLocations();
        $scope.init();
    }])

