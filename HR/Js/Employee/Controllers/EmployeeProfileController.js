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
                //EmployeeDocument: [
                //]

            };
            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.IsfrmEmployeeProfile = false;
            $scope.files = [];
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
            LookUp.GetActiveLookUpData("MaritalStatus").then(function (response) {
                $scope.MaritalStatus = response.data.lookUpLists;
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

        $scope.onChangeEmployeeType = function (id) {
            EmployeeProfileService.GetEmployeeNumber(id).then(function (response) {
                if (response && response.data) {
                    if (response.data != null) {
                        $scope.EmployeeHeader.IDNumber = response.data;
                    }
                }
            })
        }

        $scope.SaveEmlployee = function (EmployeeHeader) {
            $scope.ValidateForm();
            if (EmployeeHeader.Password.trim() != EmployeeHeader.ConfirmPassword.trim()) {
                growlService.growl("Password and confirm password should be same", 'danger');
            }
            if ($scope.IsfrmEmployeeProfile) {

                if ($scope.IsValid) {
                    if (EmployeeHeader.Address.Address1 == null) {
                        growlService.growl("Please Enter Employee Address Details", 'danger')
                        return false;
                    }
                    if (EmployeeHeader.EmployeeWorkDetail.DesignationId == null || EmployeeHeader.EmployeeWorkDetail.DepartmentId == null) {
                        growlService.growl("Please enter employee position details", 'danger')
                        return false;
                    }
                    EmployeeProfileService.SaveEmlployee(EmployeeHeader, $scope.files).then(function (response) {
                        if (response == "Success") {
                            $timeout(function () {
                                growlService.growl("Saved Successfully." + "  Employee Crediantials sent to '" + EmployeeHeader.UserEmailId + "' mail", 'success');
                            }, 1500);
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
                if ((mandtoryFields[0].parentElement.innerText).trim() == "Employee Id Type") {
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
                if ((mandtoryFields[0].parentElement.innerText).trim() == "Email") {
                    var user = angular.element('.position');
                    user[0].style.backgroundColor = "red";
                    user[0].style.color = "white";

                }
                growlService.growl('Please Enter All Mandtory Fields', 'danger');
            }
            else if (mandtoryFields.length > 0) {
                if ((mandtoryFields[0].parentElement.innerText).trim() == "Employee Id Type") {
                    if (buttonType == "Next") {
                        $state.go('EmployeeHeader.EmployeeAddress');
                    }
                    else if (buttonType == "Previous") {
                        $state.go('EmployeeHeader.EmployeeBasicInformation');
                    }

                    var basic = angular.element('.basic');
                    if (basic != null && basic != undefined) {
                        basic[0].style.backgroundColor = "#008d4c";
                        basic[0].style.color = "white";
                        $scope.IsValid = true;
                    }
                }

                if ((mandtoryFields[0].parentElement.innerText).trim() == "Address") {
                    $scope.IsAddressPageComplete = true;
                    if (buttonType == "Next") {
                        $state.go('EmployeeHeader.EmployeePosition');
                    }
                    else if (buttonType == "Previous") {
                        $state.go('EmployeeHeader.EmployeeBasicInformation');
                    }

                    var address = angular.element('.address');
                    if (address != null && address != undefined) {
                        address[0].style.backgroundColor = "#008d4c";
                        address[0].style.color = "white";
                        $scope.IsValid = true;
                    }
                }
                if ((mandtoryFields[0].parentElement.innerText).trim() == "Designation") {
                    var position = angular.element('.position');

                    if (buttonType == "Next") {
                        $state.go('EmployeeHeader.EmployeeLogin');
                        //angular.element('.logindetailsli').addClass('active');
                        //$state.go('EmployeeHeader.EmployeeDocuments');
                    }
                    else if (buttonType == "Previous") {
                        $state.go('EmployeeHeader.EmployeeAddress');
                    }

                    if (position != null && position != undefined) {
                        position[0].style.backgroundColor = "#008d4c";
                        position[0].style.color = "white";
                        $scope.IsValid = true;
                    }
                }
                if ((mandtoryFields[0].parentElement.innerText).trim() == "Email") {
                    var user = angular.element('.logindetails');

                    if (buttonType == "Previous")
                        $state.go('EmployeeHeader.EmployeePosition');

                    if (buttonType == "Next") {
                        if ($scope.EmployeeHeader.Id > 0) {
                            angular.element('.documentsli').addClass('active');
                            $state.go('EmployeeHeader.EmployeeDocuments');
                        }
                        else
                            growlService.growl("Save Employee before To Upload Documents", 'danger');
                    }
                    if (user != null && user != undefined) {
                        user[0].style.backgroundColor = "#008d4c";
                        user[0].style.color = "white";
                        $scope.IsValid = true;
                    }
                }


            }
            else
                $scope.IsValid = true;
        }
        //$scope.saveDocuments = function () {
        //    EmployeeProfileService.SaveEmployeeDocuments($scope.files, $scope.EmployeeHeader.Id).then(function (response) {
        //        $scope.GetEmployeeById();
        //    })
        //}

        $scope.EmployeeDocumentsUpload = function (e, documentType) {
            var file = e.files;
            var extensionFileNames = ['jpeg', 'pdf', 'gif', 'jpg'];
            $scope.$apply(function () {

                // STORE THE FILE OBJECT IN AN ARRAY.
                for (var i = 0; i < e.files.length; i++) {
                    if (extensionFileNames.indexOf(e.files[i].name.split('.')[1]) == -1) {
                        growlService.growl('please upload "pdf,gif,jpeg" extension only', 'danger');
                    }
                    else {
                        var DocumentType = { 'DocumentType': documentType };
                        angular.extend(e.files[i], DocumentType);
                        $scope.files.push(e.files[i]);
                        //$scope.EmployeeHeader.EmployeeDocument.push(e.files[i]);
                    }
                }

            });
            //$scope.EmployeeHeader.EmployeeDocument = file;
            //var file = e.files[0];
            //EmployeeProfileService.SaveEmployeeDocuments(file, $scope.EmployeeHeader.Id).then(function (response) {
            //    $scope.GetEmployeeById();
            //})
        }

        $scope.EmailValid = function () {

            if (!angular.isUndefined($scope.EmployeeHeader.Address.Email)) {
            }
            else {
                growlService.growl("Invalid Email", 'danger');
            }
        }

        $scope.employeeId = $stateParams.id;
        if ($scope.employeeId != null && $scope.employeeId != "") {
            EmployeeProfileService.GetEmployeeById($scope.employeeId, false).then(function (response) {
                if (response && response.data) {
                    $scope.EmployeeHeader = response.data.employeeHeader;
                    if ($scope.EmployeeHeader.EmployeeWorkDetail.JoiningDate && $scope.EmployeeHeader.EmployeeWorkDetail.JoiningDate != null) {
                        $scope.EmployeeHeader.EmployeeWorkDetail.JoiningDate = moment($scope.EmployeeHeader.EmployeeWorkDetail.JoiningDate);
                    }
                    else {
                        $scope.EmployeeHeader.EmployeeWorkDetail.JoiningDate = undefined;
                    }
                    if ($scope.EmployeeHeader.EmployeePersonalInfo.DOB && $scope.EmployeeHeader.EmployeePersonalInfo.DOB != null) {
                        $scope.EmployeeHeader.EmployeePersonalInfo.DOB = moment($scope.EmployeeHeader.EmployeePersonalInfo.DOB);
                    }
                    else {
                        $scope.EmployeeHeader.EmployeePersonalInfo.DOB = undefined;
                    }
                    if ($scope.EmployeeHeader.EmployeePersonalInfo.MarriageDate && $scope.EmployeeHeader.EmployeePersonalInfo.MarriageDate != null) {
                        $scope.EmployeeHeader.EmployeePersonalInfo.MarriageDate = moment($scope.EmployeeHeader.EmployeePersonalInfo.MarriageDate);
                    }
                    else {
                        $scope.EmployeeHeader.EmployeePersonalInfo.MarriageDate = undefined;
                    }
                    if ($scope.EmployeeHeader.EmployeeWorkDetail.ConfirmationDate && $scope.EmployeeHeader.EmployeeWorkDetail.ConfirmationDate != null) {
                        $scope.EmployeeHeader.EmployeeWorkDetail.ConfirmationDate = moment($scope.EmployeeHeader.EmployeeWorkDetail.ConfirmationDate);
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

