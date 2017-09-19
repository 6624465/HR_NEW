//angular.module('ngHR').controller('RoleRightsController', ['$scope', '$http', 'growl', '$filter', 'UtilityFunc', 'RoleService', 'growlService',
//function ($scope, $http, growl, $filter, UtilityFunc, RoleService, growlService) {

//    RoleService.GetSecurables().then(function (response) {
//        debugger;
//        $scope.Securable = response.data.Securable;
//        $scope.GetSecurable(response);
//    });

//        $scope.GetSecurable = function (response) {
//            var arr = new Array();
//            for (var i = 0; i < response.data.length; i++) {
//                var obj = {
//                    'name': response.data[i].RegistrationTypeName,
//                    'id': response.data[i].registrationType,
//                    'i': i,
//                    'checked': response.data[i].IsChecked,
//                    'type': 'module',
//                    'children': GetPageArr(response.data[i].pageList, i)
//                };
//                arr.push(obj);
//            }
//            $scope.nodes = arr;
//        }
//        function GetPageArr(data, parentIndex) {
//            var arr = new Array();

//            if (typeof data != 'undefined') {
//                for (var i = 0; i < data.length; i++) {
//                    var obj = {
//                        'name': data[i].PageName,
//                        'id': data[i].id,
//                        'i': i,
//                        'checked': data[i].IsChecked,
//                        'type': 'page',
//                        'Access': data[i].Access == undefined ? 1 : data[i].Access,
//                        parentIndex: parentIndex,
//                        'children': GetOperationArr(data[i].operationList, i)
//                    };
//                    arr.push(obj);
//                }
//            }

//            return arr;
//        }


//        function GetOperationArr(data, parentIndex) {
//            var arr = new Array();
//            if (typeof data != 'undefined') {
//                for (var i = 0; i < data.length; i++) {
//                    var obj = {
//                        'name': data[i].OperationName,
//                        'id': data[i].id,
//                        'i': i,
//                        'checked': data[i].IsChecked,
//                        'type': 'operation',
//                        parentIndex: parentIndex
//                        //'children': GetOperationArr(data[i].BranchList)
//                    };
//                    arr.push(obj);
//                }
//            }

//            return arr;
//        }


   

//}]);