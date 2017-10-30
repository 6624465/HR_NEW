//var app = angular.module('dashBoard', [])

angular.module('ngHR').controller('dashBoardController', ['$scope', '$http', 'DashBoardService',
function ($scope, $http, DashBoardService) {

    $scope.GetRegionWiseEmployees = function () {
        DashBoardService.GetRegionWiseEmployees().then(function (res) {
            if (res.data.sucess == true) {
                $scope.regionWiseEmployees = res.data.regionWiseEmployees;
                $scope.GetBarGraphDashboard('country', 'Country', res.data.regionWiseEmployees);
                $scope.GetBarGraphDashboard('gender', 'Gender', res.data.genderWiseEmployees);
                //$scope.GetBarGraphDashboard('designation', 'Designation', res.data.designationWiseEmployees);
                $scope.GetPieGraphDashboard(res.data.indiawiseGenders, 'INDIA', "INDIA", '#0000FF', '#FF1493');//'#7798BF'
                $scope.GetPieGraphDashboard(res.data.bangladeshwiseGenders, 'BANGLADESH', "BANGLADESH", '#0000FF', '#FF1493');
                $scope.GetPieGraphDashboard(res.data.cambodiawiseGenders, 'CAMBODIA', "CAMBODIA", '#0000FF', '#FF1493');
                $scope.GetPieGraphDashboard(res.data.srilankawiseGenders, 'SRILANKA', "SRILANKA", '#0000FF', '#FF1493');
                $scope.GetPieGraphDashboard(res.data.pakistanwiseGenders, 'PAKISTAN', "PAKISTAN", '#0000FF', '#FF1493');
                $scope.GetPieGraphDashboard(res.data.mayanmarwiseGenders, 'MAYANMAR', "MAYANMAR", '#0000FF', '#FF1493');
                $scope.GetPieGraphDashboard(res.data.hongkongwiseGenders, 'HONGKONG', "HONGKONG", '#0000FF', '#FF1493');
                $scope.GetPieGraphDashboard(res.data.singaporewiseGenders, 'SINGAPORE', "SINGAPORE", '#0000FF', '#FF1493');
            }
        })
    }

    //$scope.GetGenderWiseEmployees = function () {
    //    DashBoardService.GetGenderWiseEmployees().then(function (res) {
    //        if (res.data.sucess == true) {
    //            $scope.GenderWiseEmployees = res.data.regionWiseEmployees;
    //            $scope.GetBarGraphDashboard('gender', 'Gender', $scope.GenderWiseEmployees);
    //        }

    //    })
    //}
    //$scope.GetDesignationWiseEmployees = function () {
    //    DashBoardService.GetDesignationWiseEmployees().then(function (res) {
    //        if (res.data.sucess == true) {
    //            $scope.GetDesignationWiseEmployees = res.data.regionWiseEmployees;
    //            $scope.GetBarGraphDashboard('designation', 'Designation', $scope.GetDesignationWiseEmployees);
    //        }
    //    })
    //}
    $scope.GetPieGraphDashboard = function(CountryWiseGenders, type, id, c1,c2){
        Highcharts.chart(id, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: type +" " + "Employees based on Gender"
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
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
                data: CountryWiseGenders
                }]
        });

        Highcharts.theme = {
            colors: [c1, c2],
            chart: {
                backgroundColor: null,
                style: {
                    fontFamily: 'Signika, serif'
                }
            },
            title: {
                style: {
                    color: 'black',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }
            },
            subtitle: {
                style: {
                    color: 'black'
                }
            },
            tooltip: {
                borderWidth: 0
            },
            legend: {
                itemStyle: {
                    fontWeight: 'bold',
                    fontSize: '13px'
                }
            },
            xAxis: {
                labels: {
                    style: {
                        color: '#6e6e70'
                    }
                }
            },
            yAxis: {
                labels: {
                    style: {
                        color: '#6e6e70'
                    }
                }
            },
            plotOptions: {
                series: {
                    shadow: true
                },
                candlestick: {
                    lineColor: '#404048'
                },
                map: {
                    shadow: false
                }
            },

            // Highstock specific
            navigator: {
                xAxis: {
                    gridLineColor: '#D0D0D8'
                }
            },
            rangeSelector: {
                buttonTheme: {
                    fill: 'white',
                    stroke: '#C0C0C8',
                    'stroke-width': 1,
                    states: {
                        select: {
                            fill: '#D0D0D8'
                        }
                    }
                }
            },
            scrollbar: {
                trackBorderColor: '#C0C0C8'
            },

            // General
            background2: '#E0E0E8'

        };

        // Apply the theme
        Highcharts.setOptions(Highcharts.theme);
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
                data: result
            }],
        });

        //Highcharts.createElement('link', {
        //    href: 'https://fonts.googleapis.com/css?family=Dosis:400,600',
        //    rel: 'stylesheet',
        //    type: 'text/css'
        //}, null, document.getElementsByTagName('head')[0]);

        //Highcharts.theme = {
        //    colors: ['#0000FF', '#8A2BE2', '#1E90FF', '#DC143C', '#B8860B',
        //       '#FF0000', '#FFFF00', '#00FF7F'],
        //    chart: {
        //        backgroundColor: null,
        //        style: {
        //            fontFamily: 'Dosis, sans-serif'
        //        }
        //    },
        //    title: {
        //        style: {
        //            fontSize: '16px',
        //            fontWeight: 'bold',
        //            textTransform: 'uppercase'
        //        }
        //    },
        //    tooltip: {
        //        borderWidth: 0,
        //        shadow: true,
        //        backgroundColor: '#FFFFFF',
        //        style: {
        //            fontSize: '16px',
        //            fontWeight: 'bold'
        //        }

        //    },
        //    legend: {
        //        itemStyle: {
        //            fontWeight: 'bold',
        //            fontSize: '13px'
        //        }
        //    },
        //    xAxis: {
        //        labels: {
        //            style: {
        //                fontSize: '15px',
        //                fontWeight: 'bold'
        //            }
        //        }
        //    },
        //    yAxis: {
        //        title: {
        //            style: {
        //                fontSize: '18px',
        //                fontWeight: 'bold',
        //            }
        //        },
        //        labels: {
        //            style: {
        //                fontSize: '13px',
        //                fontWeight: 'bold'
        //            }
        //        }
        //    },
        //    plotOptions: {
        //        candlestick: {
        //            lineColor: '#404048'
        //        }
        //    },


        //    // General
        //    background2: '#F0F0EA'

        //};

        //Highcharts.setOptions(Highcharts.theme);
    }

    $scope.GetRegionWiseEmployees();
    
}])