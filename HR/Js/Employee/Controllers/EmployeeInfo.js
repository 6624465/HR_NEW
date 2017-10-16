angular.module('ngHR').controller('EmployeeInfoController', ['$scope', '$http', 'growlService', '$filter', 'UtilityFunc', 'LookUp', 'EmployeeProfileService','$location','$timeout',
function ($scope, $http, growlService, $filter, UtilityFunc, LookUp, EmployeeProfileService, $location, $timeout) {

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
            $scope.FilePath = baseUrl + 'Documents/';

            $scope.EducationDocuments = [];
            $scope.ExperienceLetters = [];
            $scope.ProjectDocuments = [];
            $scope.OtherDocuments = [];
        }

        $scope.formatDate = function (date) {
            if (date != null)
                return moment(date).format(UtilityFunc.DateFormat());
            else
                return null;
        }

        LookUp.GetActiveLookUpData("DocumentType").then(function (response) {
            $scope.DocumentType = response.data.lookUpLists;
        })


        $scope.employeeId = 0;

        $scope.GetEmployeeById = function () {
            EmployeeProfileService.GetEmployeeById($scope.employeeId, true).then(function (response) {
                if (response && response.data) {
                    $scope.EmployeeHeader = response.data.employeeHeader;
                    $scope.EmployeeProfilePic = response.data.imagePathName;
                    $scope.EmployeeUser = $scope.EmployeeHeader.User;
                    $scope.EmployeeWorkDetail = $scope.EmployeeHeader.EmployeeWorkDetail;
                    $scope.EmployeeAddress = $scope.EmployeeHeader.Address;
                    $scope.lookUpDescriptions = response.data.LookUpDescriptions;

                    if ($scope.EmployeeWorkDetail.JoiningDate && $scope.EmployeeWorkDetail.JoiningDate != null) {
                        $scope.EmployeeWorkDetail.JoiningDate = moment($scope.EmployeeWorkDetail.JoiningDate);
                    }
                    else {
                        $scope.EmployeeWorkDetail.JoiningDate = undefined;
                    }
                    if ($scope.EmployeeHeader.EmployeePersonalInfo.DOB && $scope.EmployeeHeader.EmployeePersonalInfo.DOB != null) {
                        $scope.EmployeeHeader.EmployeePersonalInfo.DOB = moment($scope.EmployeeHeader.EmployeePersonalInfo.DOB);
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
                    if ($scope.EmployeeHeader.EmployeePersonalInfo.Gender == 0)
                        $scope.gender = 'Male';
                    else
                        $scope.gender = 'FeMale';

                    if ($scope.EmployeeHeader.EmployeeDocument != null) {
                        angular.forEach($scope.EmployeeHeader.EmployeeDocument, function (val, id) {
                            var document = $scope.DocumentType.filter(function (item) {
                                return item.LookUpID === val.DocumentType;
                            })[0];
                            if (document.LookUpCode == "Education") {
                                $scope.EducationDocuments.push(val);
                            }
                            if (document.LookUpCode == "ExperienceLetters") {
                                $scope.ExperienceLetters.push(val);
                                $scope.ExperienceLetters[id].name = val.FileName;
                            }
                            if (document.LookUpCode == "ProjectDocuments") {
                                $scope.ProjectDocuments.push(val);
                                $scope.ProjectDocuments[id].name = val.FileName;
                            }
                            if (document.LookUpCode == "OtherDocuments") {
                                $scope.OtherDocuments.push(val);
                                $scope.OtherDocuments[id].name = val.FileName;
                            }
                            if (document.LookUpCode == "UID") {
                                $scope.UIDCard = val;
                                $scope.UIDCard.name = val.FileName;
                            }
                        })
                    }
                }
            })
        }
       

        LookUp.GetCountries().then(function (res) {
            $scope.Countries = res.data.countries;
            $scope.EmployeeInfo.Nationality =
                $filter('filter')($scope.Countries, { 'CountryCode': 'SG' })[0].Id;
        }, function (err) {
        })
        LookUp.GetActiveLookUpData("MaritalStatus").then(function (response) {
            $scope.MaritalStatus = response.data.lookUpLists;
        })

        $scope.IsfrmPersonalInfo = false;

        $scope.$watch('frmPersonalInfo.$valid', function (Valid) {
            $scope.IsfrmPersonalInfo = Valid;
        });

        $scope.SavePersonalInfo = function (EmployeeHeader) {
            //$scope.ValidateForm();
            if ($scope.IsfrmPersonalInfo) {
                $scope.EmployeeHeader.CreatedOn = moment($scope.EmployeeHeader.CreatedOn);
                $scope.EmployeeHeader.EmployeePersonalInfo.CreatedOn = moment($scope.EmployeeHeader.EmployeePersonalInfo.CreatedOn);

                EmployeeProfileService.SaveEmployeeHeader(EmployeeHeader).then(function (response) {
                    if (response.data && response.data.sucess == true) {
                        growlService.growl(response.data.message, 'success');
                        $scope.EmployeeInfo.editInfo = 0;
                        $scope.EmployeeInfo.editAddress = 0;
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
            $scope.ValidateForm();
            if ($scope.IsfrmAddressInfo || $scope.IsfrmAddressInfo) {
                $scope.EmployeeAddress.CreatedOn = moment($scope.EmployeeAddress.CreatedOn);
                EmployeeProfileService.SaveEmployeeAddress(EmployeeAddress).then(function (response) {
                    if (response.data && response.data.sucess == true) {
                        growlService.growl(response.data.message, 'success');
                        $scope.EmployeeInfo.editContact = 0;
                        $scope.EmployeeInfo.editAddress = 0;
                    }
                })
            }
        }

        $scope.IsfrmUserInfo = false;
        $scope.$watch('frmUserInfo.$valid', function (Valid) {
            $scope.IsfrmUserInfo = Valid;
        });
        $scope.SaveEmployeeUser = function (EmployeeUser) {
            //$scope.ValidateForm();
            if (EmployeeUser.Password.trim() != EmployeeUser.ConfirmPassword.trim()) {
                growlService.growl("Password and Confirm password should be same", 'danger');
                $scope.IsfrmUserInfo = false;
            }
            if ($scope.IsfrmUserInfo) {
                $scope.EmployeeUser.CreatedOn = moment($scope.EmployeeUser.CreatedOn);
                EmployeeProfileService.SaveEmployeeUser(EmployeeUser, $scope.EmployeeHeader.Id).then(function (response) {
                    if (response.data && response.data.sucess == true) {
                        growlService.growl("Password is changes successfully please login your profile once", 'success');
                        $scope.EmployeeInfo.editResetPassword = 0;
                        $$timeout(function () { window.location.pathname = ''; }, 1500);
                    }
                })
            }
        }

        $scope.uploadFile = function (e) {
            var file = e.files[0]; 
            EmployeeProfileService.SaveEmployeeDocuments(file, $scope.EmployeeHeader.Id).then(function (response) {
                $scope.GetEmployeeById();
            })
            
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
                else {
                    val.style.borderBottom = '';
                }
            })
            if (errorCount >= 1) {
                growlService.growl('Please Enter All Mandtory Fields', 'danger');
                $scope.IsfrmPersonalInfo = false;
                $scope.IsfrmAddressInfo = false;
                $scope.IsfrmUserInfo = false;

            }
            else {
                $scope.IsfrmPersonalInfo = true;
                $scope.IsfrmAddressInfo = true;
                $scope.IsfrmUserInfo = true;
            }
           
        }
    
        $scope.GetEmployeeById();
        $scope.init();
    }])