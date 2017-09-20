angular.module('ngHR').controller('RoleRightsController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc', 'RoleService', 'growlService',
function ($scope, $http, growl, $filter, UtilityFunc, RoleService, growlService) {
    $scope.GetSecure = function () {
        RoleService.GetSecurables().then(function (d) {
            debugger;
            $scope.Securable = d.data.Securable;
            $scope.GetSecurable(d);
        });
    };
    $scope.GetSecure();
        $scope.GetSecurable = function (d) {
            var Securables = d.data.Securable;
          //  $scope.Securables = d.data.Securable;
            var arr = new Array();
            angular.forEach(Securables, function (value, key) {
                debugger;
                var obj = {
                    //RegistrationType: value.RegistrationType,
                    //OperationDescription: value.OperationDescription,
                    //SecurableID: value.SecurableID,
                    'name': value.PageID,
                    'id': value.SecurableID,
                    'type': 'module',
                    'children': GetPageArr(Securables, key)
                };
                debugger;
                arr.push(obj);
            });
            $scope.nodes = arr;

        }
      
        function GetPageArr(Securables, parentIndex) {
            debugger;
            var arr = new Array();
            if (Securables) {
                debugger;
                angular.forEach(Securables, function (value, key) {
                    var obj = {
                        'name': value.OperationID,
                        'id': value.SecurableID,
                        'i': key,
                        'type': 'page',
                        parentIndex: parentIndex
                    }
                    arr.push(obj);
                })
            }
            return arr;
        }


        $scope.GetRole = function () {
            RoleService.GetRoles().then(function (res) {
                $scope.roles = res.data.Roles;
            });
        };
        $scope.GetRole();
      
        $scope.SaveEmployeeSecurbles=function()
        {
            debugger;
            var arr = new Array();
            var Obj = {
                checked: '',
                id: '',
                name: '',
                type: ''
            };
            angular.forEach($scope.securables, function (i, val) {
                if (i.checked) {
                    debugger;
                    var Obj = {
                        IsChecked: i.checked,
                        id: i.id,
                        name: i.name,
                        type: i.type
                    };
                    debugger;
                    arr.push(Obj);
                }
            });
            //angular.forEach(i.children, function (x, Child) {
            //    debugger;
            //    //if (x.checked) {
            //    var Obj1 = {
            //        IsChecked: x.checked,
            //        id: x.id,
            //        name: x.name,
            //        type: x.type,
            //        Access: x.Access == 0 ? 1 : x.Access
            //    };
            //    arr.push(Obj1);
            //});
            //var isValid = false;
            //angular.forEach(arr, function (obj, i) {
            //    if (obj.IsChecked == true)
            //        isValid = true;
            //});
            RoleService.SaveSecurables($scope.Securable).then(function () {

            });
        }

}]);