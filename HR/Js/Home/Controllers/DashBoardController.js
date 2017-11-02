//var app = angular.module('dashBoard', [])

angular.module('ngHR').controller('dashBoardController', ['$scope', '$http', 'DashBoardService',
function ($scope, $http, DashBoardService) {
    $scope.init = function () {
        $scope.IsBangladesh = true;
        $scope.IsCambodia = true;
        $scope.IsSrilanka = true;
        $scope.IsPakistan = true;
        $scope.IsMayanmar = true;
        $scope.IsIndia = true;
        $scope.IsHongkong = true;
        $scope.IsSingapore = true;
        $scope.genderWiseEmployees = '';
    }
    $scope.GetRegionWiseEmployees = function () {
        DashBoardService.GetRegionWiseEmployees().then(function (res) {
            if (res.data.sucess == true) {
                $scope.regionWiseEmployees = res.data.regionWiseEmployees;
                $scope.GetBarGraphDashboard('country', 'Country', res.data.regionWiseEmployees);
                //$scope.genderWiseEmployees = res.data.genderWiseEmployees;
                //$scope.genderWiseGraph();
                $scope.GetBarGraphDashboard('gender', 'Gender', res.data.genderWiseEmployees);
                //$scope.GetBarGraphDashboard('designation', 'Designation', res.data.designationWiseEmployees);
                res.data.indiawiseGenders.length > 0 ? $scope.GetPieGraphDashboard(res.data.indiawiseGenders, 'INDIA', 'INDIA') : $scope.IsIndia = false;
                res.data.bangladeshwiseGenders.length > 0 ? $scope.GetPieGraphDashboard(res.data.bangladeshwiseGenders, 'BANGLADESH', "BANGLADESH") : $scope.IsBangladesh = false;
                res.data.cambodiawiseGenders.length > 0 ? $scope.GetPieGraphDashboard(res.data.cambodiawiseGenders, 'CAMBODIA', "CAMBODIA") : $scope.IsCambodia = false;
                res.data.srilankawiseGenders.length > 0 ? $scope.GetPieGraphDashboard(res.data.srilankawiseGenders, 'SRILANKA', "SRILANKA") : $scope.IsSrilanka = false;
                res.data.pakistanwiseGenders.length > 0 ? $scope.GetPieGraphDashboard(res.data.pakistanwiseGenders, 'PAKISTAN', "PAKISTAN") : $scope.IsPakistan = false;
                res.data.mayanmarwiseGenders.length > 0 ? $scope.GetPieGraphDashboard(res.data.mayanmarwiseGenders, 'MAYANMAR', "MAYANMAR") : $scope.IsMayanmar = false;
                res.data.hongkongwiseGenders.length > 0 ? $scope.GetPieGraphDashboard(res.data.hongkongwiseGenders, 'HONGKONG', "HONGKONG") : $scope.IsHongkong = false;
                res.data.singaporewiseGenders.length > 0 ? $scope.GetPieGraphDashboard(res.data.singaporewiseGenders, 'SINGAPORE', "SINGAPORE") : $scope.IsSingapore = false;
            }
        })
    }
    $scope.GetPieGraphDashboard = function (CountryWiseGenders, type, id) {
        var c1 = '#337ef7', c2 = type == 'SINGAPORE' ? '#ff66b3' : '#f458f4'
        Highcharts.chart(id, {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: type
            },
            tooltip: {
                //headerFormat: '<span style="font-size:11px">{series.name}</span><br/>',
                pointFormat: '<b>{point.percentage:.0f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 50,
                    dataLabels: {
                        enabled: true,
                        format: '',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    size: 250
                }
            },
            
            series: [{
                name: 'Countries',
                colorByPoint: true,
                data: CountryWiseGenders,
                colors: [c1, c2],
                }]
        });
    }

    $scope.GetBarGraphDashboard = function (id, type, result) {

        Highcharts.chart(id, {
            chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                }
            },
            //chart: {
            //    type: 'column'
            //},
            title: {
                text: "Total Employees Based on " + type + ""
            },

            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    //text: 'Total percent market share'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                allowPointSelect: true,
                cursor: 'pointer',
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        //format: '{point.y}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
            },

            series: [{
                name: type,
                colorByPoint: true,
                data: result,
                colors: ['#0000FF', '#8A2BE2', '#1E90FF', '#DC143C', '#B8860B',
               '#FF0000', '#00FF7F'],
            }],
        });

    }
    $scope.genderWiseGraph = function () {
        var html = '';
        angular.forEach($scope.genderWiseEmployees, function (item) {
            html += ' <tr><td>' + item.name + '</td><td>' + item.male + '</td><td>' + item.female + '</td></tr>';
        });
        $('#tableID').html(html);
        Highcharts.setOptions({
            colors: ['#337ef7', '#f458f4']
        });
        Highcharts.chart('genderWiseEmployees', {
            
            data: {
                table: 'datatable'
            },
            chart: {
                type: 'column'
            },
            title: {
                text: "Total Employees Based on gender"
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Values'
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.point.y + ' ' + this.point.name.toLowerCase();
                }
            }
        });
    }
    $scope.init();
    $scope.GetRegionWiseEmployees();
    
}])