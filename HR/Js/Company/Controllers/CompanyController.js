angular.module('ngHR').controller('CompanyListController', ['$scope', '$http', 'CompanyService', '$timeout', 'growl', '$filter',
    function ($scope, $http, CompanyService, $timeout, growl, $filter) {
        $scope.isSelected = true;
        $scope.showLoading = false;
        $scope.init = function () {
            $scope.Companies = {},
            $scope.CompanyList = {},
            $scope.CompanyDetails = {
                Address: {}
            },
            $scope.BranchDetails = {
                Address: {}
            }
        }

        $scope.detailsUrl = '/Js/Company/Templates/Company/companydetails.html';
        $scope.init();
        $scope.getCompanyList = function () {
            CompanyService.GetCopmanyDetails().then(function (response) {
                if (response.data && response.data.success == true) {
                    var arr = new Array();
                    angular.forEach(response.data.CompaniesList, function (val, idx) {
                        var obj = {
                            'label': val.CompanyName,
                            'id': val.CompanyCode,
                            'i': idx,
                            'type': 'company',
                            'children': $scope.GetBranchArr(val.Branches, idx)
                        };
                        arr.push(obj);
                    })
                    $scope.CompanyList = arr;
                    $scope.Companies = response.data.CompaniesList;
                }
            })
        }
        $scope.showSelected = function (sel) {
            $scope.showLoading = true;
            $scope.selectedNode = sel;

            if (sel.type == "company") {
                $scope.detailsUrl = '/Js/Company/Templates/Company/companydetails.html';
                $scope.CompanyDetails = $scope.Companies[sel.i];
            }
            else if (sel.type == "branch") {
                $scope.detailsUrl = '/Js/Company/Templates/Company/branchdetails.html';
                $scope.BranchDetails = $scope.Companies[sel.parentIndex].Branches[sel.i];
                $scope.BranchDetails.Type = "Branch";
            }
        };

        CompanyService.GetCountries().then(function (res) {
            $scope.Countries = res.data.countries;
            $scope.CompanyDetails.Address.CountryId =
                $filter('filter')($scope.Countries, { 'CountryCode': 'SG' })[0].Id;
            $scope.BranchDetails.Address.CountryId =
                $filter('filter')($scope.Countries, { 'CountryCode': 'SG' })[0].Id;
        }, function (err) { })

        $scope.GetBranchArr = function (branchList, parentIndex) {
            var arr = new Array();
            if (branchList) {
                angular.forEach(branchList, function (val, idx) {
                    var obj = {
                        'label': val.BranchName,
                        'id': val.BranchCode,
                        'i': idx,
                        'type': 'branch',
                        parentIndex: parentIndex
                    };
                    arr.push(obj);
                })
            }
            return arr;
        }

        //Region for Clear
        $scope.Clear = function () {
            $scope.CompanyDetails = "";
        };
        //Region end

        //region for Save

        $scope.SaveCompany = function (details) {
            if (details) {
                CompanyService.SaveCompany(details).then(function (res) {
                    if (res.data && res.data.success == true) {
                        growlService.growl(res.data.message, 'success');
                        $scope.CompanyDetails = {};
                    }
                })
            }
        }
        $scope.SaveBranch = function (branchDetails) {
            if (branchDetails) {
                CompanyService.SaveBranch(branchDetails).then(function (res) {
                    if (res.data && res.data.success == true) {
                        growlService.growl(res.data.message, 'success');
                        $scope.CompanyDetails = {};
                    }

                })
            }
        }

        // region end


        $scope.getCompanyList();
    }])