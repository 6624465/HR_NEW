angular.module('ngHR').controller('EmployeeProfileController', ['$scope', '$http', 'growl', '$filter', 'limitToFilter',
    'UtilityFunc', 'Employee', 'LookUp', 'HolidayListService', 'growlService', 'EmployeeProfileService', '$timeout', '$stateParams',
    '$state', function ($scope, $http, growl, $filter, limitToFilter, UtilityFunc, Employee, LookUp, HolidayListService,
        growlService, EmployeeProfileService, $timeout, $stateParams, $state) {


        $scope.init = function () {
            $scope.EducationDocuments = [];
            $scope.ExperienceLetters = [];
            $scope.ProjectDocuments = [];
            $scope.OtherDocuments = [];
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
                }
            };
            $scope.EmployeeDocument = [];
            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.IsfrmEmployeeProfile = false;
            $scope.files = [];
            $scope.IDNumber = '';
            $scope.FilePath = baseUrl + 'Documents/';

            if ($scope.employeeId == "new") {
                EmployeeProfileService.GetEmployeeNumber().then(function (response) {
                    if (response && response.data) {
                        if (response.data != null) {
                            $scope.EmployeeHeader.IDNumber = response.data;
                        }
                    }
                })
            }
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
            LookUp.GetActiveLookUpData("MartialSatus").then(function (response) {
                $scope.MaritalStatus = response.data.lookUpLists;
            })
            LookUp.GetActiveLookUpData("ProbabtonPeriod").then(function (response) {
                $scope.ProbabtonPeriod = response.data.lookUpLists;
            })
            LookUp.GetActiveLookUpData("NoticePeriod").then(function (response) {
                $scope.NoticePeriod = response.data.lookUpLists;
            })
            LookUp.GetActiveLookUpData("DocumentType").then(function (response) {
                $scope.DocumentType = response.data.lookUpLists;
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
        $scope.ageChecking = function (DOB) {
            if (DOB !== "Invalid Date") {
                var userDate = new Date(DOB);
                var current_date = new Date();
                var year = current_date.getFullYear();
                var month = current_date.getMonth();
                var day = current_date.getDate();

                var dateDiff = new Date(year + "-" + month + "-" + day);
                var timeDiff = Math.abs(dateDiff.getTime() - userDate.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                var noofyears = diffDays / 365;

                if (noofyears < 18) {
                    growlService.growl('Age should be 18 years', 'danger');
                    $scope.EmployeeHeader.EmployeePersonalInfo.DOB = undefined;
                    // return false;
                } else {
                    $scope.ageErrorMsg = "";
                }
            }
        }

        $scope.CheckJoiningDate = function (JoiningDate) {
            if (JoiningDate !== "Invalid Date") {
                var userDate = new Date(JoiningDate);
                var current_date = new Date();
                var year = current_date.getFullYear();
                var month = current_date.getMonth();
                var day = current_date.getDate();

                var dateDiff = new Date(year + "-" + month + "-" + day);
                var timeDiff = Math.abs(dateDiff.getTime() - userDate.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                var noofyears = diffDays / 365;

                if (noofyears < 18) {
                    growlService.growl('Date Of Joining should be 18 years', 'danger');
                    $scope.EmployeeHeader.EmployeeWorkDetail.JoiningDate = undefined;
                    // return false;
                } else {
                    $scope.ageErrorMsg = "";
                }
            }
        }

        $scope.SaveEmlployee = function (EmployeeHeader) {
            //$scope.ValidateForm();
            if (EmployeeHeader.Password && EmployeeHeader.ConfirmPassword && EmployeeHeader.Password.trim() != EmployeeHeader.ConfirmPassword.trim()) {
                growlService.growl("Password and confirm password should be same", 'danger');
            }
            if ($scope.IsfrmEmployeeProfile) {
                var employeeAddress = EmployeeHeader.Address;
                var employeePersonalInfo = EmployeeHeader.EmployeePersonalInfo;
                var employeeWorkDetail = EmployeeHeader.EmployeeWorkDetail;
                EmployeeHeader.EmployeePersonalInfo = new Array();
                EmployeeHeader.EmployeeWorkDetail = new Array();
                EmployeeHeader.Address = new Array();
                EmployeeHeader.EmployeePersonalInfo.push(employeePersonalInfo);
                EmployeeHeader.EmployeeWorkDetail.push(employeeWorkDetail);
                EmployeeHeader.Address.push(employeeAddress);

                EmployeeProfileService.SaveEmlployee(EmployeeHeader, $scope.files, $scope.EmployeeDocument).then(function (response) {
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
            else {
                growlService.growl('Please Enter All Mandtory Fields', 'danger');
            }
        }

        $scope.CancelDocument = function (item, name) {
            $scope.EducationDocuments.splice(item, 1);
            var document = $scope.EmployeeDocument.filter(function (item) {
                return item.Name === name;
            })[0];
            var index = $scope.EmployeeDocument.indexOf(document);
            $scope.EmployeeDocument.splice(index, 1);
        }

        $scope.Remove = function () {
            $scope.UIDCard = null;
        }
        $scope.CancelExperienceLetter = function (item) {
            $scope.ExperienceLetters.splice(item, 1);

        }
        $scope.CancelProjectDocuments = function (item) {
            $scope.ProjectDocuments.splice(item, 1);
        }
        $scope.CancelOtherDocuments = function (item) {
            $scope.OtherDocuments.splice(item, 1);
        }

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
                        var data = {};
                        data.Name = e.files[i].name;
                        data.DocumentType = documentType;
                        angular.extend(e.files[i], DocumentType);
                        $scope.files.push(e.files[i]);
                        $scope.EmployeeDocument.push(data);

                        if (documentType == 'UID') {
                            $scope.UIDCard = e.files[i];
                        }
                        if (documentType == 'Education')
                            $scope.EducationDocuments.push(e.files[i]);

                        if (documentType == 'ExperienceLetters')
                            $scope.ExperienceLetters.push(e.files[i]);

                        if (documentType == 'ProjectDocuments')
                            $scope.ProjectDocuments.push(e.files[i]);

                        if (documentType == 'OtherDocuments')
                            $scope.OtherDocuments.push(e.files[i]);
                        if ($scope.EmployeeHeader.EmployeeDocument == null) {
                            $scope.EmployeeHeader.EmployeeDocument = new Array();
                        }
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



        $scope.EmployeeList = function (text) {
            return EmployeeProfileService.GetEmployees(text).then(function (response) {
                return limitToFilter(response.data.employees, 15);
            }, function (err) { });
        };

        $scope.EmployeeSelected = function (obj) {
            $scope.EmployeeHeader.ManagerId = obj.Id;
            $scope.EmployeeHeader.ManagerName = obj.Name;
        }

        $scope.LookUpData();
        $scope.BranchLocations();


        $scope.employeeId = $stateParams.id;
        if ($scope.employeeId != "new") {
            EmployeeProfileService.GetEmployeeById($scope.employeeId, false).then(function (response) {
                if (response && response.data) {
                    $scope.EmployeeHeader = response.data.employeeHeader;
                    $scope.EmployeeHeader.EmployeePersonalInfo = $scope.EmployeeHeader.EmployeePersonalInfo[0];
                    $scope.EmployeeHeader.EmployeeWorkDetail = $scope.EmployeeHeader.EmployeeWorkDetail[0];
                    $scope.EmployeeHeader.Address = $scope.EmployeeHeader.Address[0];

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
                    if ($scope.EmployeeHeader.EmployeeWorkDetail.ResignationDate && $scope.EmployeeHeader.EmployeeWorkDetail.ResignationDate != null) {
                        $scope.EmployeeHeader.EmployeeWorkDetail.ResignationDate = moment($scope.EmployeeHeader.EmployeeWorkDetail.ResignationDate);
                    }
                    else {
                        $scope.EmployeeHeader.EmployeeWorkDetail.ResignationDate = undefined;
                    }
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

        $scope.init();
    }])

