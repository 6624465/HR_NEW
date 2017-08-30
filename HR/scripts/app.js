/// <reference path="D:\08042017\HR\HR\dist/js/datetime-picker.js" />

var app = angular.module('ngHR', ['mwl.calendar',
    'ui.bootstrap',
    'angular-growl',
    'ngAnimate',
    'ui.router',
    'angular-loading-bar',
    'oc.lazyLoad',
    'treeControl',
    'ngMaterial',
    'ui.bootstrap.datetimepicker',
    'ui.dateTimeInput']);

app.controller('MainCtrl', function ($scope) {
    $scope.iframeHeight = window.innerHeight - 100;
});

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
                templateUrl: baseUrl + 'Company/CompanyList',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngHR',
                                files: [
                                    baseUrl + 'Js/Company/Controllers/CompanyController.js',
                                    baseUrl + 'Js/Company/Services/CompanyService.js'
                                ]
                            }
                        ]);
                    }
                }
            })

            .state('EmployeeType', {
                url: '/EmployeeType',
                templateUrl: baseUrl + 'LookUp/Index',
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
                templateUrl: baseUrl + 'LookUp/EmployeeDesignation',
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
                templateUrl: baseUrl + 'LookUp/EmployeeDepartment',
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

            .state('PaymentType', {
                url: '/PaymentType',
                templateUrl: baseUrl + 'LookUp/PaymentType',
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
                templateUrl: baseUrl + 'SetUp/HolidayList',
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
                templateUrl: baseUrl + 'LookUp/LeaveType',
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
                templateUrl: baseUrl + 'EmployeeLeave/EmployeeLeave',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'ngHR',
                            files: [
                                baseUrl + 'Js/Leave/Controllers/EmployeeLeave.js',
                                baseUrl + 'Js/Leave/Services/EmployeeLeaveService.js',
                            ]
                        })
                    }
                }
            })
           .state('AppliedLeaveList', {
               url: '/AppliedLeaveList',
               templateUrl: baseUrl + 'AppliedLeaveList/AppliedLeaveList',
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
        //growlProvider.globalTimeToLive(4000);
        //growlProvider.globalDisableIcons(false);
        //growlProvider.globalDisableCountDown(true);
        cfpLoadingBarProvider.includeSpinner = false;//includeBar
        cfpLoadingBarProvider.includeBar = true;
        growlProvider.globalTimeToLive({ success: 4000, error: 2000, warning: 3000, info: 4000 });
    });


app.factory('UtilityFunc', ['$filter', '$q', function ($filter, $q) {
    var obj = {};

    var sessionObject = JSON.parse(sessionStorage.getItem("User"));

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

