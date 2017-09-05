angular.module('ngHR').controller('PaymentTypeController', ['$scope', '$http', 'LookUp', 'growl', 'growlService',
function ($scope, $http, LookUp, growl, growlService) {
    var config = {};
    growl.success(" a success message and not unique", config);
    $scope.init = function () {
        $scope.PaymentType = {
            LookUpID: null,
            LookUpCode: null,
            LookUpDescription: null,
            IsActive: null,
            LookUpCategory: "PaymentType"
        },
        $scope.PaymentTypes = {}
    }

    angular.element('.skin-blue').addClass("sidebar-collapse");

    $scope.GetLookUpData = function () {
        LookUp.GetLookUpData("PaymentType").then(function (response) {
            if (response.data && response.data.message == "Saved Successfully.") {
                $scope.PaymentTypes = response.data.lookUpLists;
                var config = {};
                growl.success(" a success message and not unique", config);
            }
        })
    }

    $scope.IsfrmPaymentType = false;
    $scope.$watch('frmPaymentType.$valid', function (Valid) {
        debugger;
        $scope.IsfrmPaymentType = Valid;
    });

    $scope.onClickSavePaymentType = function (paymentType) {
        //debugger;
        if ($scope.PaymentType.LookUpCode != null) {
            if ($scope.IsfrmPaymentType) {
                LookUp.SaveLookUpData(paymentType).then(function (response) {
                    debugger;
                    if (response.data && response.data.message == "Saved Successfully.") {
                        growlService.growl("Saved Successfully..", 'success');
                        $('#AddPaymentTypeDialog').modal('hide');
                        $scope.GetLookUpData();
                    }
                    else {

                        growlService.growl(response.data.message, 'danger');
                    }
                })
            }
            else {

                growlService.growl("Please Enter All Fileds", 'danger');
            }
        }
    },
    $scope.GetLookUpData();
    $scope.onEditPaymentType = function (paymentType) {
        debugger
        $scope.PaymentType.LookUpCode = paymentType.LookUpCode;
        $scope.PaymentType.LookUpDescription = paymentType.LookUpDescription;
        $scope.PaymentType.IsActive = paymentType.IsActive;
        $scope.PaymentType.LookUpID = paymentType.LookUpID;
        $('#AddPaymentTypeDialog').modal('show');

    }

    $scope.onClickCancelPaymentType = function () {
        $scope.clearTextBoxes();
    },

    $scope.addPaymentType = function () {
        $scope.clearTextBoxes();
        $scope.PaymentType.IsActive = true;
        $('#AddPaymentTypeDialog').modal('show');
    };

    $scope.clearTextBoxes = function () {
        $scope.PaymentType.LookUpCode = null;
        $scope.PaymentType.LookUpDescription = null;
        $scope.PaymentType.IsActive = null;
        $scope.PaymentType.LookUpID = null;
        $('#AddPaymentTypeDialog').modal('hide');
    }


    $scope.init();

}])