/// <reference path="D:\08042017\HR\HR\dist/js/datetime-picker.js" />

var app = angular.module('ngHR', ['mwl.calendar',
    'ui.bootstrap',
    'angular-growl',
    'ngAnimate',
    'ui.router',
    'angular-loading-bar',
    'oc.lazyLoad',
    'ngTable',
    'treeControl',
    'ngMaterial',
    'ui.bootstrap.datetimepicker',
    'ui.dateTimeInput']);

app.controller('MainCtrl', function ($scope) {
    $scope.iframeHeight = window.innerHeight - 100;
});

angular.element('.skin-blue').addClass("sidebar-collapse");
app.config(
    function ($stateProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider, $ocLazyLoadProvider, growlProvider) {
        $stateProvider
            .state('Home', {
                url: '/Home',
                templateUrl: baseUrl + '/Home/index',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngHR',
                                files: [baseUrl + 'Js/Home/Controllers/HomeController.js']
                            }
                        ]);
                    }
                }
            })


            .state('Company', {
                url: '/Company',
                templateUrl: baseUrl + 'Company/Company/CompanyList',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngHR',
                                files: [
                                    baseUrl + 'Js/Company/Controllers/CompanyController.js',
                                    baseUrl + 'Js/Company/Services/CompanyService.js',
                                    baseUrl + 'Js/Master/MasterService/LookUp.js',
                                ]
                            }
                        ]);
                    }
                }
            })

            .state('EmployeeType', {
                url: '/EmployeeType',
                templateUrl: baseUrl + 'Master/LookUp/Index',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngHR',
                                files: [
                                    baseUrl + 'Js/Master/MasterController/EmployeeTypeController.js',
                                    baseUrl + 'Js/Master/MasterService/LookUp.js'
                                ]
                            }
                        ]);
                    }
                }
            })

            .state('EmployeeDesgination', {
                url: '/EmployeeDesgination',
                templateUrl: baseUrl + 'Master/LookUp/EmployeeDesignation',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngHR',
                                files: [
                                    baseUrl + 'Js/Master/MasterController/EmployeeDesignationController.js',
                                    baseUrl + 'Js/Master/MasterService/LookUp.js'
                                ]
                            }
                        ]);
                    }
                }
            })

            .state('EmployeeDepartment', {
                url: '/EmployeeDepartment',
                templateUrl: baseUrl + 'Master/LookUp/EmployeeDepartment',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngHR',
                                files: [
                                    baseUrl + 'Js/Master/MasterController/EmployeeDepartmentController.js',
                                    baseUrl + 'Js/Master/MasterService/LookUp.js'
                                ]
                            }
                        ]);
                    }
                }
            })

            .state('EmployeeStatus', {
                url: '/EmployeeStatus',
                templateUrl: baseUrl + 'Master/LookUp/EmployeeStatus',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngHR',
                                files: [
                                    baseUrl + 'Js/Master/MasterController/EmployeeStatusController.js',
                                    baseUrl + 'Js/Master/MasterService/LookUp.js'
                                ]
                            }
                        ]);
                    }
                }
            })

            .state('PaymentType', {
                url: '/PaymentType',
                templateUrl: baseUrl + 'Master/LookUp/PaymentType',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngHR',
                                files: [
                                    baseUrl + 'Js/Master/MasterController/PaymentTypeController.js',
                                    baseUrl + 'Js/Master/MasterService/LookUp.js'
                                ]
                            }
                        ]);
                    }
                }
            })

            .state('HolidayList', {
                url: '/HolidayList',
                templateUrl: baseUrl + 'Leave/SetUp/HolidayList',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngHR',
                                files: [
                                    baseUrl + 'Js/Leave/Controllers/HolidayListController.js',
                                    baseUrl + 'Js/Leave/Services/HolidayListService.js'
                                ]
                            }
                        ]);
                    }
                }
            })

            .state('LeaveType', {
                url: '/LeaveType',
                templateUrl: baseUrl + 'Master/LookUp/LeaveType',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngHR',
                                files: [
                                    baseUrl + 'Js/Master/MasterController/LeaveTypeController.js',
                                    baseUrl + 'Js/Master/MasterService/LookUp.js'
                                ]
                            }
                        ]);
                    }
                }
            })

            .state('EmployeeLeave', {
                url: '/EmployeeLeave',
                templateUrl: baseUrl + 'Leave/EmployeeLeave/EmployeeLeave',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'ngHR',
                            files: [
                                baseUrl + 'Js/Leave/Controllers/EmployeeLeave.js',
                                baseUrl + 'Js/Leave/Services/EmployeeLeaveService.js',
                                 baseUrl + 'Js/Master/MasterService/LookUp.js'
                            ]
                        })
                    }
                }
            })
           .state('AppliedLeaveList', {
               url: '/AppliedLeaveList',
               templateUrl: baseUrl + 'Leave/AppliedLeaveList/AppliedLeaveList',
               resolve: {
                   loadPlugin: function ($ocLazyLoad) {
                       return $ocLazyLoad.load({
                           name: 'ngHR',
                           files: [
                               baseUrl + 'Js/Leave/Controllers/AppliedLeaveListController.js',
                                baseUrl + 'Js/Leave/Services/EmployeeLeaveService.js',
                           ]
                       })
                   }
               }
           })

           .state('EmployeeHeader', {
               url: '/EmployeeHeader/:id',
               templateUrl: baseUrl + 'Employees/EmployeeProfile/EmployeeProfile',
               resolve: {
                   loadPlugin: function ($ocLazyLoad) {
                       return $ocLazyLoad.load([
                           {
                               name: 'ngHR',
                               files: [baseUrl + 'Js/Employee/Controllers/EmployeeProfileController.js',
                                       baseUrl + 'Js/Master/MasterService/LookUp.js',
                                       baseUrl + 'Js/Leave/Services/HolidayListService.js',
                                       baseUrl + 'Js/Employee/Services/EmployeeProfileService.js', ]

                           }
                       ]);
                   }
               }
           })

             .state('EmployeeHeader.EmployeeBasicInformation', {
                 url: '/EmployeeBasicInformation',
                 templateUrl: baseUrl + 'Js/Employee/Templates/BasicInformation.html',
                 resolve: {
                     loadPlugin: function ($ocLazyLoad) {
                         return $ocLazyLoad.load([
                             {
                                 name: 'ngHR',
                                 files: [baseUrl + 'Js/Employee/Controllers/EmployeeProfileController.js',
                                 ]
                             }
                         ]);
                     }
                 }
             })

             .state('EmployeeHeader.EmployeePosition', {
                 url: '/EmployeePosition',
                 templateUrl: baseUrl + 'Js/Employee/Templates/EmployeePosition.html',
                 resolve: {
                     loadPlugin: function ($ocLazyLoad) {
                         return $ocLazyLoad.load([
                             {
                                 name: 'ngHR',
                                 files: [baseUrl + 'Js/Employee/Controllers/EmployeeProfileController.js']
                             }
                         ]);
                     }
                 }
             })
             .state('EmployeeHeader.EmployeeAddress', {
                 url: '/EmployeeAddress',
                 templateUrl: baseUrl + 'Js/Employee/Templates/EmployeeAddressDetails.html',
                 resolve: {
                     loadPlugin: function ($ocLazyLoad) {
                         return $ocLazyLoad.load([
                             {
                                 name: 'ngHR',
                                 files: [baseUrl + 'Js/Employee/Controllers/EmployeeProfileController.js']
                             }
                         ]);
                     }
                 }
             })
            .state('EmployeeDirectory', {
                url: '/EmployeeDirectory',
                templateUrl: baseUrl + 'Employees/EmployeeProfile/EmployeeDirectory',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngHR',
                                files: [baseUrl + 'Js/Employee/Controllers/EmployeeDirectoryController.js',
                                       baseUrl + 'Js/Employee/Services/EmployeeProfileService.js',
                                ]
                            }
                        ]);
                    }
                }
            })
            //.state('Employee.EmployeePaymentMode', {
            //    url: '/EmployeePaymentMode',
            //    templateUrl: baseUrl + 'Js/Employee/Templates/EmployeePaymentMode.html',
            //    resolve: {
            //        loadPlugin: function ($ocLazyLoad) {
            //            return $ocLazyLoad.load([
            //                {
            //                    name: 'ngHR',
            //                    files: [baseUrl + 'Js/Employee/Controllers/EmployeeProfileController.js']
            //                }
            //            ]);
            //        }
            //    }
            //})

            //.state('Employee.EmployeePFESI', {
            //    url: '/EmployeePFESI',
            //    templateUrl: baseUrl + 'Js/Employee/Templates/EmployeePFESI.html',
            //    resolve: {
            //        loadPlugin: function ($ocLazyLoad) {
            //            return $ocLazyLoad.load([
            //                {
            //                    name: 'ngHR',
            //                    files: [baseUrl + 'Js/Employee/Controllers/EmployeeProfileController.js']
            //                }
            //            ]);
            //        }
            //    }
            //})



            .state('ActivitySummary', {
                url: '/ActivitySummary',
                templateUrl: baseUrl + 'Js/Home/Views/activitysummary.html',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngHR',
                                files: [baseUrl + 'Js/Home/Controllers/ActivitySummaryCntrl.js']
                            }
                        ]);
                    }
                }
            })

        $urlRouterProvider.otherwise('/');
        growlProvider.onlyUniqueMessages(false);
        cfpLoadingBarProvider.includeSpinner = false;//includeBar
        cfpLoadingBarProvider.includeBar = true;
        growlProvider.globalTimeToLive({ success: 4000, error: 2000, warning: 3000, info: 4000 });
    });

app.run(function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function (e) {
        var sessionObject = JSON.parse(sessionStorage.getItem("authenticatedUser"));
        if (sessionObject == null || (sessionObject.UserID == null || sessionObject.UserID == '')) {
            window.location.pathname = '';
        }
    })
})

app.factory('UtilityFunc', ['$filter', '$q', function ($filter, $q) {
    var obj = {};
    var sessionObject = JSON.parse(sessionStorage.getItem("authenticatedUser"));

    obj.UserID = function () {
        return sessionObject ? sessionObject.UserID : '';
    }
    obj.UserName = function () {
        return sessionObject ? sessionObject.UserName : '';
    }
    obj.Email = function () {
        return sessionObject ? sessionObject.Email : '';
    }
    obj.RoleCode = function () {
        return sessionObject ? sessionObject.RoleCode : '';
    }
    obj.BranchId = function () {
        return sessionObject ? sessionObject.BranchId : '';
    }

    obj.DateFormat = function () {
        return 'DD/MM/YYYY';
    };

    return obj;
}])

app.factory('Employee', function () {
    var employee = {};
    function set(data) {
        employee = data;
    }

    function get() {
        return employee;
    }

    return {
        set: set,
        get: get
    }
})
app.directive('logiconNumber', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                if (typeof inputValue == 'number') {
                    inputValue = inputValue.toString();
                }

                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});

