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

//app.controller('MainCtrl', function ($scope) {
//    $scope.iframeHeight = window.innerHeight - 109;
//});

app.config(
    function ($stateProvider, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider, $ocLazyLoadProvider, growlProvider) {
        $stateProvider
            .state('Home', {
                url: '/Home',
                templateUrl: baseUrl + 'Home/index',
                //resolve: {
                //    loadPlugin: function ($ocLazyLoad) {
                //        return $ocLazyLoad.load([
                //            {
                //                name: 'ngHR',
                //                files: [baseUrl + 'Js/Home/Controllers/HomeController.js']
                //            }
                //        ]);
                //    }
                //}
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
                templateUrl: baseUrl + 'Settings/LookUp/EmployeeType',
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
            //.state('RoleRights', {
            //    url: '/RoleRights',
            //    templateUrl: baseUrl + 'Account/RoleRights/Roles',
            //    resolve: {
            //        loadPlugin: function ($ocLazyLoad) {
            //            return $ocLazyLoad.load([
            //                {
            //                    name: 'ngHR',
            //                    files: [
            //                           baseUrl + 'Js/Account/Controllers/RolesController.js',
            //                           baseUrl + 'Js/Account/Services/RoleService.js'
            //                    ]
            //                }
            //            ]);
            //        }
            //    }
            //})
             .state('Roles', {
                 url: '/Roles',
                 templateUrl: baseUrl + 'Account/Securable/RolerRights',
                 resolve: {
                     loadPlugin: function ($ocLazyLoad) {
                         return $ocLazyLoad.load([
                             {
                                 name: 'ngHR',
                                 files: [
                                        baseUrl + 'Js/Account/Controllers/RoleRightsController.js',
                                        baseUrl + 'Js/Account/Services/RoleService.js'
                                 ]
                             }
                         ]);
                     }
                 }
             })

            .state('Employee', {
                url: '/Employee',
                templateUrl: baseUrl + 'Settings/LookUp/EmployeeDesignation',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngHR',
                                files: [
                                    baseUrl + 'Js/Master/MasterController/EmployeeDesignationController.js',
                                    baseUrl + 'Js/Master/MasterController/EmployeeTypeController.js',
                                    baseUrl + 'Js/Master/MasterController/EmployeeStatusController.js',
                                    baseUrl + 'Js/Master/MasterController/EmployeeDepartmentController.js',
                                    baseUrl + 'Js/Master/MasterService/LookUp.js'
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('EmployeeDepartment', {
                url: '/EmployeeDepartment',
                templateUrl: baseUrl + 'Home/EmployeeDepartment',
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
                templateUrl: baseUrl + 'Settings/LookUp/EmployeeStatus',
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
                templateUrl: baseUrl + 'Settings/LookUp/PaymentType',
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
                templateUrl: baseUrl + 'Settings/LookUp/LeaveType',
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

            .state('EmployeeHeader.EmployeeLogin', {
                url: '/EmployeeLogin',
                templateUrl: baseUrl + 'Js/Employee/Templates/LoginDetails.html',
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

            .state('EmployeeHeader.EmployeeDocuments', {
                url: '/EmployeeDocuments',
                templateUrl: baseUrl + 'Js/Employee/Templates/EmployeeDocuments.html',
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
                                       baseUrl + 'Js/Master/MasterService/LookUp.js',
                                       baseUrl + 'Js/Leave/Services/HolidayListService.js'
                                ]
                            }
                        ]);
                    }
                }
            })

             .state('EmployeeProfile', {
                 url: '/EmployeeProfile',
                 templateUrl: baseUrl + 'Employees/EmployeeProfile/Index',
             })

               .state('Master', {
                   url: '/Master',
                   templateUrl: baseUrl + 'Home/MasterList',
               })

            //.state('Employees', {
            //    url: '/Employees',
            //    templateUrl: baseUrl + 'Home/MasterData',
            //})

            .state('Administration', {
                url: '/Administration',
                templateUrl: baseUrl + 'Home/AdministrationData',
            })
             .state('Leave', {
                 url: '/Leave',
                 templateUrl: baseUrl + 'Leave/SetUp/Leave',
             })

            .state('EmployeeProfileInfo', {
                url: '/EmployeeProfileInfo',
                templateUrl: baseUrl + 'Employees/EmployeeProfile/EmployeeInfo',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngHR',
                                files: [baseUrl + 'Js/Employee/Controllers/EmployeeInfo.js',
                                    baseUrl + 'Js/Master/MasterService/LookUp.js',
                                    baseUrl + 'Js/Employee/Services/EmployeeProfileService.js',
                                ]
                            }
                        ]);
                    }
                }
            })

            .state('Salary', {
                url: '/Salary',
                templateUrl: baseUrl + 'PayRoll/Salary/Salary',
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            {
                                name: 'ngHR',
                                files: [baseUrl + 'Js/PayRoll/Controllers/SalaryController.js',
                                  
                                ]
                            }
                        ]);
                    }
                }
               
            })
            .state('PayRoll', {
                url: '/PayRoll',
                templateUrl: baseUrl + 'PayRoll/Salary/PayRoll',
                //resolve: {
                //    loadPlugin: function ($ocLazyLoad) {
                //        return $ocLazyLoad.load([
                //            {
                //                name: 'ngHR',
                //                files: [baseUrl + 'Js/Home/Controllers/ActivitySummaryCntrl.js']
                //            }
                //        ]);
                //    }
                //}
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

        //var sessionObject = JSON.parse(sessionStorage.getItem("authenticatedUser"));
        //if (sessionObject.UserID != null)
        //    $urlRouterProvider.otherwise('/Home/Index');
        //else
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

//app.directive('hasRight', function () {
//    debugger;
//    return {

//        link: function (scope, element, attrs) {
//            var rightvalue = attrs.rightvalue;
//            var AccessRight = attrs.accessright;
//            var flag = false;
//            var rights = JSON.parse(sessionStorage.getItem('SECURABLES'));
//            angular.forEach(rights, function (item, index) {
//                debugger;
//                if (item.OperationID == rightvalue && item.AccessRight != "1" && AccessRight != "3" && item.AccessRight != "0")
//                    flag = true;
//                else if (item.OperationID == rightvalue && item.AccessRight == AccessRight)
//                    flag = true;
//                else if (item.OperationID == rightvalue && item.AccessRight == "0")
//                    flag = true;
//                else if (item.OperationID == rightvalue && item.AccessRight == "4")
//                    flag = true;
//                if (item.OperationID == rightvalue && item.AccessRight == "1")
//                    flag = false;
//            });
//            if (flag)
//                element.show();
//            else
//                element.hide();
//        }
//    }
//});

app.directive('treeView', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            localNodes: '=model',
            localClick: '&click'
        },
        link: function (scope, tElement, tAttrs, transclude) {

            var maxLevels = (angular.isUndefined(tAttrs.maxlevels)) ? 10 : tAttrs.maxlevels;
            var hasCheckBox = (angular.isUndefined(tAttrs.checkbox)) ? false : true;
            scope.showItems = [];

            scope.showHide = function (ulId) {
                //
                var hideThis = document.getElementById(ulId);
                var showHide = angular.element(hideThis).attr('class');
                angular.element(hideThis).attr('class', (showHide === 'show' ? 'hide' : 'show'));
            }

            scope.showIcon = function (node) {
                if (!angular.isUndefined(node.children)) return true;
            }

            scope.checkIfChildren = function (node) {
                if (!angular.isUndefined(node.children)) return true;
            }

            /////////////////////////////////////////////////
            /// SELECT ALL CHILDRENS
            // as seen at: http://jsfiddle.net/incutonez/D8vhb/5/
            function parentCheckChange(item) {
                for (var i in item.children) {
                    item.children[i].checked = item.checked;
                    if (item.children[i].children) {
                        parentCheckChange(item.children[i]);
                    }
                }
            }

            scope.checkChange = function (node, child) {
                // scope.active = scope.active == node.id ? node.id : node.id;
                if (node.children) {

                    parentCheckChange(node);
                }

                $('input[type=checkbox]').change(function () {
                    if (this.checked) { // if checked - check all parent checkboxes
                        $(this).parents('li').children('input[type=checkbox]').prop('checked', true);
                    }
                    // children checkboxes depend on current checkbox
                    $(this).parent().find('input[type=checkbox]').prop('checked', this.checked);
                });
            }

            scope.showAccessRights = true;
            scope.active = 1060;
            scope.showAcessRights = function (node) {
                scope.active = scope.active == node.id ? node.id : node.id;
                if (node.type != "page") {
                    scope.showAccessRights = true;
                    node.Access = "0";
                }
                else {
                    scope.showAccessRights = false;
                    if (node.Access == 0)
                        node.Access = 1;
                }


            }
            /////////////////////////////////////////////////

            function renderTreeView(collection, level, max) {
                //
                var text = '';

                text += '<li ng-repeat="n in ' + collection + '" >';
                text += '<span ng-show=showIcon(n) class="show-hide" ng-click=showHide(n.id)><i class="fa fa-plus-square"></i></span>';
                text += '<span ng-show=!showIcon(n) style="padding-right: 13px"></span>';

                if (hasCheckBox) {
                    text += '<input class="treeview-checkbox"  class="custom-unchecked" type="checkbox" ng-model=n.checked ng-change=checkChange(n,localNodes) value="" >&nbsp;&nbsp;&nbsp;&nbsp;<label ng-click=showAcessRights(n) >{{n.name}}</label>';

                    //<div class="checkbox m-b-15 ">   <label> <input type="checkbox" class="tree-checkbox" value="" aria-label="Freight" ng-model=n.checked ng-change=checkChange(n)> <i class="input-helper"></i></label></div>';

                    //

                }

                //text += '<span class="edit" ng-click=localClick({node:n})><i class="fa fa-pencil"></i></span>'

                // text += '<label>{{n.name}}</label>';
                //text += '<ul class="radioctn"> <li  ng-class={active:active==n.id}>';
                //text += '<div class="treeRadio border-row-left p-l-15"><md-radio-group ng-model="n.Access" >';
                //text += '<md-radio-button value=1 class="md-primary" ng-disabled=showAccessRights> Read Only</md-radio-button>';
                //text += '<md-radio-button value=2 class="md-primary" ng-disabled=showAccessRights>  Read Write </md-radio-button>';
                //text += '<md-radio-button value=3 class="md-dangar" ng-disabled=showAccessRights>Delete</md-radio-button>';
                //text += '<md-radio-button value=4 class="md-success" ng-disabled=showAccessRights>Full Access </md-radio-button>';
                //text += '</md-radio-group></li></ul>';
                if (level < max) {
                    text += '<ul id="{{n.id}}" class="hide" ng-if=checkIfChildren(n)>' + renderTreeView('n.children', level + 1, max) + '';
                    text += '</li></ul>';

                    text += '<ul class="radioctn"> <li  ng-class={active:active==n.id}>';
                    text += '<div class="treeRadio border-row-left p-l-15"><div ng-model="n.Access">';
                    text += '<div class="treecheck"><input type="radio" ng-model="n.Access" value=1   ng-disabled=showAccessRights > <label > Read Only</label> </div>';
                    text += '<div class="treecheck"><input type="radio" ng-model="n.Access" value=2  ng-disabled=showAccessRights> <label>Read Write</label></div>';
                    text += '<div class="treecheck"><input type="radio" ng-model="n.Access" value=3  ng-disabled=showAccessRights > <label> Delete </label></div>';
                    text += '<div class="treecheck"><input type="radio" ng-model="n.Access" value=4  ng-disabled=showAccessRights > <label> Full Access </label></div>';
                    text += '</div></li></ul>';

                } else {
                    text += '</li>';
                }


                return text;
            }// end renderTreeView();


            try {
                var text = '<ul  class="tree-view-wrapper ">';
                text += renderTreeView('localNodes', 1, maxLevels);
                text += '</ul>';
                tElement.html(text);
                $compile(tElement.contents())(scope);
            }
            catch (err) {
                tElement.html('<b>ERROR!!!</b> - ' + err);
                $compile(tElement.contents())(scope);
            }
        }
    };
});


app.directive('compareTo', function () {

    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
});
app.directive('hasRight', function () {
    return {
        link: function (scope, element, attrs) {
            var rightvalue = attrs.rightvalue;
            var AccessRight = attrs.accessright;
            var flag = false;
            var rights = JSON.parse(sessionStorage.getItem('SECURABLES'));
            angular.forEach(rights, function (item, index) {
                if (item.OperationID == rightvalue && item.AccessRight != "1" && AccessRight != "3" && item.AccessRight != "0")
                    flag = true;
                else if (item.OperationID == rightvalue && item.AccessRight == AccessRight)
                    flag = true;
                else if (item.OperationID == rightvalue && item.AccessRight == "0")
                    flag = true;
                else if (item.OperationID == rightvalue && item.AccessRight == "4")
                    flag = true;
                if (item.OperationID == rightvalue && item.AccessRight == "1")
                    flag = false;
            });
            if (flag)
                element.show();
            else
                element.hide();
        }
    }
});
app.directive("showContact", function () {
    return {
        restrict: "A",
        link: function (scope, element) {
            element.on("click", function () {
                angular.element('.pmb-block').toggleClass('toggled');
            })
        }
    }
})
