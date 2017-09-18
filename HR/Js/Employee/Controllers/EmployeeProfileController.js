angular.module('ngHR').controller('EmployeeProfileController', ['$scope', '$http', 'growl', '$filter',
    'UtilityFunc', 'Employee', 'LookUp', 'HolidayListService', 'growlService', 'EmployeeProfileService', '$timeout', '$stateParams',
    '$state', function ($scope, $http, growl, $filter, UtilityFunc, Employee, LookUp, HolidayListService,
        growlService, EmployeeProfileService, $timeout, $stateParams, $state) {

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

        $scope.SaveEmlployee = function (EmployeeHeader) {
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
                            if (response.data && response.data.sucess == true) {
                                growlService.growl(response.data.message, 'success');
                            $state.go('EmployeeDirectory');
                            }
                            else {
                                growlService.growl("Error Occured While Saving The Employee", 'danger');
                            }
                        }), function (err) {
                            growlService.growl(err, 'danger');
                        }
                    }
              
            }
            
        }
           
        $scope.onClickValid = function (buttonType) {
            $scope.ValidateForm(buttonType);
            
        }

        $scope.ValidateForm = function (buttonType) {
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

            if (errorCount >= 1) {
                if ((mandtoryFields[0].parentElement.innerText).trim() == "First Name") {
                    var basic = angular.element('.basic');
                    basic[0].style.backgroundColor = "red";
                    basic[0].style.color = "white";
                }
                if ((mandtoryFields[0].parentElement.innerText).trim() == "Address") {
                    var address = angular.element('.address');
                    address[0].style.backgroundColor = "red";
                    address[0].style.color = "white";
                }
                if ((mandtoryFields[0].parentElement.innerText).trim() == "Designation") {
                    var position = angular.element('.position');
                    position[0].style.backgroundColor = "red";
                    position[0].style.color = "white";
                }
                growlService.growl('Please Enter All Mandtory Fields', 'danger');
            }
            else {
                if ((mandtoryFields[0].parentElement.innerText).trim() == "First Name") {
                    if (buttonType == "Next")
                        $state.go('EmployeeHeader.EmployeeAddress');
                    else
                        $state.go('EmployeeHeader.EmployeeBasicInformation');
                    
                    var basic = angular.element('.basic');
                    if (basic != null && basic != undefined) {
                        basic[0].style.backgroundColor = "#008d4c";
                        basic[0].style.color = "white";
                    }
                    

                }

                if ((mandtoryFields[0].parentElement.innerText).trim() == "Address") {
                    $scope.IsAddressPageComplete = true;
                    if (buttonType == "Next")
                        $state.go('EmployeeHeader.EmployeePosition');
                    else
                        $state.go('EmployeeHeader.EmployeeBasicInformation');

                    var address = angular.element('.address');
                    if (address != null && address != undefined) {
                        address[0].style.backgroundColor = "#008d4c";
                        address[0].style.color = "white";
                    }
                }
                if ((mandtoryFields[0].parentElement.innerText).trim() == "Designation") {
                    var position = angular.element('.position');

                    if (buttonType == "Next")
                        $state.go('EmployeeHeader.EmployeePosition');
                    else
                        $state.go('EmployeeHeader.EmployeeAddress');

                    if (position != null && position != undefined) {
                        position[0].style.backgroundColor = "#008d4c";
                        position[0].style.color = "white";
                    }
                }

                $scope.IsValid = true;
            }
        }
        $scope.EmailValid=function()
        {
            
            if (!angular.isUndefined($scope.EmployeeHeader.Address.Email))
            {
            }
            else
            {
                growlService.growl("Invalid Email", 'danger');
            }
        }

        $scope.employeeId = $stateParams.id;
        if ($scope.employeeId != null && $scope.employeeId != "") {
            EmployeeProfileService.GetEmployeeById($scope.employeeId).then(function (response) {
                if (response && response.data) {
                    $scope.EmployeeHeader = response.data;
                    if ($scope.EmployeeHeader.EmployeeWorkDetail.JoiningDate && $scope.EmployeeHeader.EmployeeWorkDetail.JoiningDate != null) {
                        $scope.EmployeeHeader.EmployeeWorkDetail.JoiningDate = moment(response.data.EmployeeWorkDetail.JoiningDate);
                    }
                    else {
                        $scope.EmployeeHeader.EmployeeWorkDetail.JoiningDate = undefined;
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
                    if ($scope.EmployeeHeader.EmployeeWorkDetail.ConfirmationDate && $scope.EmployeeHeader.EmployeeWorkDetail.ConfirmationDate != null) {
                        $scope.EmployeeHeader.EmployeeWorkDetail.ConfirmationDate = moment(response.data.EmployeeWorkDetail.ConfirmationDate);
                    }
                    else {
                        $scope.EmployeeHeader.EmployeeWorkDetail.ConfirmationDate = undefined;
                    }
                }
            })
        }

        $scope.LookUpData();
        $scope.BranchLocations();
        $scope.init();
    }])

