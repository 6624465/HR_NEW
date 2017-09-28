angular.module('ngHR').controller('RoleRightsController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc', 'RoleService', 'growlService',
function ($scope, $http, growl, $filter, UtilityFunc, RoleService, growlService) {

    $scope.rr = {};
    $scope.GetSecure = function () {
        RoleService.GetSecurables().then(function (d) {
            $scope.GetRolesList(d.data);
        });
    };
    $scope.GetSecure();

    $scope.roleChanged = function () {
        RoleService.GetSecurablebyId($scope.rr.role).then(function (d) {
            $scope.GetRolesList(d.data);
        });
    };



    function GetPageArr(data, parentIndex) {
        var arr = new Array();
        if (typeof data != 'undefined') {
            for (var i = 0; i < data.length; i++) {
                var obj = {
                    'name': data[i].PageName,
                    'id': data[i].id,
                    'i': i,
                    'checked': data[i].IsChecked,
                    'type': 'page',
                    'Access': data[i].Access == undefined ? 1 : data[i].Access,
                    parentIndex: parentIndex,
                    'children': GetOperationArr(data[i].operationList, i)
                };
                arr.push(obj);
            }
        }

        return arr;
    }


    function GetOperationArr(data, parentIndex) {
        var arr = new Array();
        if (typeof data != 'undefined') {
            for (var i = 0; i < data.length; i++) {
                var obj = {
                    'name': data[i].OperationName,
                    'id': data[i].id,
                    'i': i,
                    'checked': data[i].IsChecked,
                    'type': 'operation',
                    parentIndex: parentIndex
                };
                arr.push(obj);
            }
        }

        return arr;
    }

    $scope.GetRolesList = function (d) {
        var arr = new Array();
        for (var i = 0; i < d.Securable.length; i++) {
            var obj = {
                'name': d.Securable[i].RegistrationTypeName,
                'id': d.Securable[i].registrationType,
                'i': i,
                'SecurableID': d.Securable[i].SecurableID,
                'checked': d.Securable[i].IsChecked,
                'type': 'module',
                'children': GetPageArr(d.Securable[i].pageList, i)
            };
            arr.push(obj);
        }
        $scope.nodes = arr;
    }


    $scope.GetRole = function () {
        RoleService.GetRoles().then(function (res) {
            $scope.roles = res.data.Roles;
        });
    };
    $scope.GetRole();

    $scope.IsFrmRoleRightsValid = false;
    $scope.$watch('frmRoleRight.$valid', function (isValid) {
        $scope.IsFrmRoleRightsValid = isValid;
    });


    $scope.SaveEmployeeSecurbles = function (securables) {
        var arr = new Array();
        var Obj = {
            checked: '',
            id: '',
            name: '',
            type: ''
        };

        angular.forEach(securables, function (i, val) {
            if (i.checked) {
                var Obj = {
                    IsChecked: i.checked,
                    id: i.SecurableID,
                    name: i.name,
                    type: i.type
                };
                arr.push(Obj);
            }
            angular.forEach(i.children, function (x, Child) {
                var Obj1 = {
                    IsChecked: x.checked,
                    id: x.id,
                    name: x.name,
                    type: x.type,
                    Access: x.Access == 0 ? 1 : x.Access
                };
                angular.forEach(x.children, function (y, subChild) {
                    if (y.checked) {
                        Obj1.IsChecked = true;
                        var Obj = {
                            IsChecked: y.checked,
                            id: y.id,
                            name: y.name,
                            type: y.type
                        }
                        arr.push(Obj);
                    }
                });
                arr.push(Obj1);
            });

        });
        if ($scope.IsFrmRoleRightsValid) {
            RoleService.SaveSecurables($scope.rr.role, arr).then(function (d) {
                growlService.growl('Success', 'success');
            }, function (err) { });

        }
        else {

            growlService.growl('please select atleast one Role ', 'danger');

        }
    };


}]);

