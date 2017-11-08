angular.module('ngHR').controller('GrantLeaveController', ['$scope', 'LookUp', 'UtilityFunc', 'GrantLeaveService', '$filter','growlService',
function ($scope, LookUp, UtilityFunc, GrantLeaveService, $filter, growlService) {

    $scope.init = function () {
        //$scope.Isshow = false;
        $scope.IsShowLeaves = true;
        $scope.IsGeneral = true;
        $scope.IsProbation = true;
        $scope.LeaveHeder = {
            BranchId: UtilityFunc.BranchId(),
            LeaveDetail: {
                BranchId: UtilityFunc.BranchId(),
            },

        };
        $scope.GrantLeaveDetails = {};

    }
    $scope.GetGrantLeaves = function () {
        GrantLeaveService.GetGrantLeaves().then(function (res) {
            if (res.data.sucess == true) {
                $scope.GrantLeaveDetails = res.data.LeaveHeaderVMList;
            }
        })
    }

    $scope.onEditGrantLeave = function (grantLeave) {
        var leaveDetails = $scope.LeaveHeder.LeaveDetail;
        var grantLeaveDetails = grantLeave.LeaveDetail;
        $scope.LeaveHeder = grantLeave;
        $scope.LeaveHeder.LeaveDetail = leaveDetails;

        angular.forEach($scope.LeaveHeder.LeaveDetail, function (leaveDetailList,id) {
            angular.forEach(grantLeaveDetails, function (grantLeaveDetail) {
                if (grantLeaveDetail.LeaveType == leaveDetailList.LeaveType) {
                    $scope.Isshow = true;
                    leaveDetailList.Id = grantLeaveDetail.Id;
                    leaveDetailList.IsChecked = grantLeaveDetail.IsChecked;
                    leaveDetailList.TotalLeaves = grantLeaveDetail.TotalLeaves;
                }
            })
        })
    }
    $scope.GetLookup = function () {
        LookUp.GetActiveLookUpData("Year").then(function (response) {
            if (response.data && response.data.success == true) {
                $scope.Year = response.data.lookUpLists;
            }
        }, function () {
        });
        LookUp.GetActiveLookUpData("PeriodicityType").then(function (response) {
            if (response.data && response.data.success == true) {
                $scope.PeriodicityType = response.data.lookUpLists;
            }
        }, function () {
        });
        LookUp.GetActiveLookUpData("PeriodType").then(function (response) {
            if (response.data && response.data.success == true) {
                $scope.PeriodType = response.data.lookUpLists;
            }
        }, function () {
        });
        LookUp.GetActiveLookUpData("LeaveSchemeType").then(function (response) {
            if (response.data && response.data.success == true) {
                $scope.LeaveSchemeType = response.data.lookUpLists;
            }
        }, function () {
        })
        LookUp.GetActiveLookUpData("LeaveType").then(function (response) {

            if (response.data && response.data.success == true) {
                $scope.LeaveType = response.data.lookUpLists;
                var array = new Array();
                angular.forEach($scope.LeaveType, function (item) {
                    array.push($scope.LeaveDetailsPreparation(item));
                });

                $scope.LeaveHeder.LeaveDetail = array;
            }
        }, function () {
        })
    }

    $scope.LeaveDetailsPreparation = function (item) {
        return obj = {
            IsChecked: false,
            LeaveTypeDescription: item.LookUpDescription,
            LeaveType: item.LookUpID,
            TotalLeaves: 0,
            BranchId: UtilityFunc.BranchId()
        };

    }


    //$scope.ShowPeriod = function () {
    //    if ($scope.Periodicity == 1107) {
    //        $scope.Isshow = false;
    //    }
    //    else {
    //        $scope.Isshow = true;
    //    }
    //}

    $scope.ShowLeaveTypes = function () {

        if ($scope.LeaveScheme != null) {
            if ($scope.LeaveScheme == 1110) {
                $scope.s = [' Maternity Leave', 'Earned Levae', 'Restricted Holiday', 'Compensatory leave'];
                $scope.IsData = true;
            }
            else {
                $scope.s = ['Casual Leave', 'HalfPay Leave'];
                $scope.IsData = true;
            }
        }
        else {
            $scope.IsShowLeaves = true;
        }

    }
    $scope.GetLookup();
    $scope.LeaveType = new Array();
    $scope.GLLeave = false;
    $scope.toggleCostSheet = function () {
        $scope.GLLeave = !$scope.GLLeave;
        angular.forEach($scope.LeaveType, function (item, index) {
            item.IsChecked = $scope.GLLeave;
            $scope.Isshow = true;
        });
    };
    $scope.ShowTextBox = function (item) {
        if (item) {
            $scope.Isshow = true;
        }
    }
    $scope.Save = function () {
        var leaveDetail = $filter('filter')($scope.LeaveHeder.LeaveDetail, { IsChecked: true });
        $scope.LeaveHeder.LeaveDetail = leaveDetail;
        GrantLeaveService.SaveGrantLeaves($scope.LeaveHeder).then(function (res) {
            if (res.data != null && res.sucess == true) {
                growlService.growl(res.data.message, 'success');
            }
            $scope.init();
            $scope.GetGrantLeaves();
        });
    }
    $scope.GetGrantLeaves();
    $scope.init();

}]);

