angular.module('ngHR').controller('CompanyListController', ['$scope', '$http', 'CompanyService', '$timeout', 'growl', '$filter', 'growlService','$state',
    function ($scope, $http, CompanyService, $timeout, growl, $filter, growlService, $state) {

        $scope.isSelected = true;
        $scope.showLoading = false;
        $scope.iscompany = true;
        $scope.init = function () {
            $scope.Companies = {},
            $scope.CompanyList = {},
            $scope.CompanyDetails = {
                Address: {},
                IsActive : true
            },
            $scope.BranchDetails = {
                Address: {},
                IsActive: true
            }
            $scope.isbranch = false;
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
                            'children': val.Branches.length > 0? $scope.GetBranchArr(val.Branches, idx):""
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
                $scope.isbranch = true;
                $scope.detailsUrl = '/Js/Company/Templates/Company/companydetails.html';
                $scope.CompanyDetails = $scope.Companies[sel.i];
                $scope.CompanyDetails.IsActive = true;
            }
            else if (sel.type == "branch") {
                $scope.isbranch = false;
                $scope.detailsUrl = '/Js/Company/Templates/Company/branchdetails.html';
                $scope.BranchDetails = $scope.Companies[sel.parentIndex].Branches[sel.i];
                $scope.BranchDetails.Type = "Branch";
                $scope.BranchDetails.IsActive = true;
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
            debugger
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
            if ($scope.CompanyDetails == null || $scope.CompanyDetails == "" || $scope.CompanyDetails!=null) {
                $scope.CompanyDetails = "";
            }
            else
            {
                $scope.BranchDetails = "";
            }
        };
        //Region end

        //region for Save
        $scope.IsfrmCompanyDetails = false;
        $scope.$watch('frmCompanyDetails.$valid', function (Valid) {
            $scope.IsfrmCompanyDetails = Valid;
        });
        $scope.SaveCompany = function (details) {
            if ($scope.IsfrmCompanyDetails) {
                CompanyService.SaveCompany(details).then(function (res) {
                    if (res.data && res.data.success == true) {
                        growlService.growl(res.data.message, 'success');
                        $scope.CompanyDetails = {};
                    }
                    else
                    {
                        growlService.growl(res.data.message, 'danger');
                    }
                })
            }
            else {
                growlService.growl('Please Enter All Mandtory Fields', 'danger');
            }
        }


        $scope.IsfrmBranchDetails = false;
        $scope.$watch('frmBranchDetails.$valid', function (Valid) {
            $scope.IsfrmBranchDetails = Valid;
        });

        $scope.SaveBranch = function (branchDetails) {
            if($scope.IsfrmBranchDetails){
                CompanyService.SaveBranch(branchDetails).then(function (res) {
                    if (res.data && res.data.success == true) {
                        growlService.growl('Saved Successfully', 'success');
                        $scope.CompanyDetails = {};
                    }
                    else
                    {
                        growlService.growl(res.data.message, 'danger');
                    }
                })
            }
            else
                growlService.growl('Please Enter All Mandtory Fields', 'danger');
        }

        // region end

        $scope.AddBranch = function (CompanyCode, CompanyName, CompanyId) {
            $scope.getCompanyList();
            $scope.detailsUrl = '/Js/Company/Templates/Company/branchdetails.html'
            $scope.isbranch = false;
            $scope.iscompany = false;
            $scope.BranchDetails = {
                CompanyCode: CompanyCode,
                CompanyName: CompanyName,
                CompanyId: CompanyId,
            };
        };

        $scope.getCompanyList();
    }])