angular.module('ngHR').controller('EmployeeProfileController', ['$scope', '$http', 'growl', '$filter',
    'UtilityFunc', 'Employee', 'LookUp', 'HolidayListService', 'growlService', 'EmployeeProfileService', '$timeout', '$stateParams',
    'growlService', function ($scope, $http, growl, $filter, UtilityFunc, Employee, LookUp, HolidayListService,
        growlService, EmployeeProfileService, $timeout, $stateParams) {

        $scope.init = function () {

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

            LookUp.GetCountries().then(function (res) {
                $scope.Countries = res.data.countries;
                $scope.EmployeeHeader.Address.CountryId =
                    $filter('filter')($scope.Countries, { 'CountryCode': 'SG' })[0].Id;
            }, function (err) {
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
                $scope.ValidateForm();
            if ($scope.IsfrmEmployeeProfile) {
                if ($scope.IsValid) {
                    if (EmployeeHeader.Address.Address1 == null) {
                        growlService.growl("Please Enter Employee Address Details", 'danger')
                        return false;
                    }
                    if (EmployeeHeader.EmployeeWorkDetail.Designation == null || EmployeeHeader.EmployeeWorkDetail.Department == null) {
                        growlService.growl("Please enter employee position details", 'danger')
                        return false;
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
            //if (mandtoryFields.length >= 6) {
            //    if(mandtoryFields[0].parentElement.innerText == "First Name ")
            //        $scope.IsValid

            //}
            if (errorCount >= 1)
            growlService.growl('Please Enter All Mandtory Fields', 'danger');
            else
                $scope.IsValid = true;
        }

        $scope.employeeId = $stateParams.id;
        if ($scope.employeeId != null && $scope.employeeId != "") {
            EmployeeProfileService.GetEmployeeById($scope.employeeId).then(function (response) {
                if (response && response.data) {
                    $scope.EmployeeHeader = response.data;
                 //   $scope.EmployeeHeader.EmployeePersonalInfo.DOB = moment(response.data.EmployeePersonalInfo.DOB).format('MM/DD/YYYY');
                    $scope.EmployeeHeader.EmployeeWorkDetail.JoiningDate = moment(response.data.EmployeeWorkDetail.JoiningDate).format('MM/DD/YYYY');
                    //if (!angular.isUndefined($scope.k9.declarationHeaderK9) && $scope.k9.declarationHeaderK9 != null) {
                    //    if ($scope.k9.declarationHeaderK9.OpenDate == null) {
                    //        $scope.k9.declarationHeaderK9.OpenDate = undefined;
                    //    }
                    //    else
                    //        $scope.k9.declarationHeaderK9.OpenDate = moment($scope.k9.declarationHeaderK9.OpenDate);
                    //}
                    //$scope.k9.declarationHeaderK9.OpenDate = moment();
                    //$scope.k9.declarationHeaderK9.ImportDate = moment();
                    debugger;
                    if($scope.EmployeeHeader.EmployeePersonalInfo.DOB &&$scope.EmployeeHeader.EmployeePersonalInfo.DOB!=null)
                    {
                        $scope.EmployeeHeader.EmployeePersonalInfo.DOB = moment(response.data.EmployeePersonalInfo.DOB);
                    }
                    if ($scope.EmployeeHeader.EmployeePersonalInfo.MarriageDate && $scope.EmployeeHeader.EmployeePersonalInfo.MarriageDate != null) {
                        $scope.EmployeeHeader.EmployeePersonalInfo.MarriageDate = moment(response.data.EmployeePersonalInfo.MarriageDate);
                    }
                    if ($scope.EmployeeHeader.EmployeeWorkDetail.ConfirmationDate && $scope.EmployeeHeader.EmployeeWorkDetail.ConfirmationDate != null) {
                        $scope.EmployeeHeader.EmployeeWorkDetail.ConfirmationDate = moment(response.data.EmployeeWorkDetail.ConfirmationDate);
                    }
                }
            })
        }

        $scope.LookUpData();
        $scope.BranchLocations();
        $scope.init();
    }])

