//var app = angular.module('dashBoard', [])

angular.module('ngHR').controller('dashBoardController', ['$scope', '$http', 'DashBoardService',
function ($scope, $http, DashBoardService) {
    $scope.init = function () {
        $scope.IsBangladesh = true;
    }
    $scope.GetRegionWiseEmployees = function () {
        DashBoardService.GetRegionWiseEmployees().then(function (res) {
            if (res.data.sucess == true) {
                $scope.regionWiseEmployees = res.data.regionWiseEmployees;
                $scope.GetBarGraphDashboard('country', 'Country', res.data.regionWiseEmployees);
                $scope.GetBarGraphDashboard('gender', 'Gender', res.data.genderWiseEmployees);
                //$scope.GetBarGraphDashboard('designation', 'Designation', res.data.designationWiseEmployees);
                $scope.GetPieGraphDashboard(res.data.indiawiseGenders, 'INDIA', 'INDIA');
                if (res.data.bangladeshwiseGenders != null) {

                }
                res.data.bangladeshwiseGenders != null ? $scope.GetPieGraphDashboard(res.data.bangladeshwiseGenders, 'BANGLADESH', "BANGLADESH") : $scope.IsBangladesh = false;
                $scope.GetPieGraphDashboard(res.data.cambodiawiseGenders, 'CAMBODIA', "CAMBODIA");
                $scope.GetPieGraphDashboard(res.data.srilankawiseGenders, 'SRILANKA', "SRILANKA");
                $scope.GetPieGraphDashboard(res.data.pakistanwiseGenders, 'PAKISTAN', "PAKISTAN");
                $scope.GetPieGraphDashboard(res.data.mayanmarwiseGenders, 'MAYANMAR', "MAYANMAR");
                $scope.GetPieGraphDashboard(res.data.hongkongwiseGenders, 'HONGKONG', "HONGKONG");
                $scope.GetPieGraphDashboard(res.data.singaporewiseGenders, 'SINGAPORE', "SINGAPORE");
            }
        })
    }
    $scope.GetPieGraphDashboard = function(CountryWiseGenders, type, id){
        Highcharts.chart(id, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: type
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.2f}',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Countries',
                colorByPoint: true,
                data: CountryWiseGenders,
                colors: ['#337ef7', '#f458f4'],
                }]
        });

       
    }

    $scope.GetBarGraphDashboard = function (id, type, result) {

        Highcharts.chart(id, {
            chart: {
                type: 'column'
            },
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
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y}'
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

    //$scope.GetgenderGraphDashboard = function (id, type, result) {
    //    Highcharts.chart(id, {
    //        chart: {
    //            type: 'column'
    //        },
    //        title: {
    //            text: type
    //        },
    //        subtitle: {
    //            text: ''
    //        },
    //        xAxis: {
    //            categories: [
    //               '{series.name}'
    //            ],
    //            crosshair: true
    //        },
    //        yAxis: {
    //            min: 0,
    //            title: {
    //                text: 'Rainfall (mm)'
    //            }
    //        },
    //        tooltip: {
    //            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    //            footerFormat: '</table>',
    //            shared: true,
    //            useHTML: true
    //        },
    //        plotOptions: {
    //            column: {
    //                pointPadding: 0.2,
    //                borderWidth: 0
    //            }
    //        },
    //        series: result
    //    });
    //}

    $scope.GetRegionWiseEmployees();
    
}])