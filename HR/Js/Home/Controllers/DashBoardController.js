//var app = angular.module('dashBoard', [])

angular.module('ngHR').controller('dashBoardController', ['$scope', '$http', 'DashBoardService',
function ($scope, $http, DashBoardService) {

    $scope.GetRegionWiseEmployees = function () {
        DashBoardService.GetRegionWiseEmployees().then(function (res) {
            if (res.data.sucess == true) {
                $scope.regionWiseEmployees = res.data.regionWiseEmployees;
                $scope.GetBarGraphDashboard('country', 'Country', $scope.regionWiseEmployees);
                $scope.GetBarGraphDashboard('gender', 'Gender', res.data.genderWiseEmployees);
                $scope.GetBarGraphDashboard('designation', 'Designation', res.data.designationWiseEmployees);
            }
        })
    }

    $scope.GetGenderWiseEmployees = function () {
        DashBoardService.GetGenderWiseEmployees().then(function (res) {
            if (res.data.sucess == true) {
                $scope.GenderWiseEmployees = res.data.regionWiseEmployees;
                $scope.GetBarGraphDashboard('gender', 'Gender', $scope.GenderWiseEmployees);
            }
        })
    }
    $scope.GetDesignationWiseEmployees = function () {
        DashBoardService.GetDesignationWiseEmployees().then(function (res) {
            if (res.data.sucess == true) {
                $scope.GetDesignationWiseEmployees = res.data.regionWiseEmployees;
                $scope.GetBarGraphDashboard('designation', 'Designation', $scope.GetDesignationWiseEmployees);
            }
        })
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
                        format: '{point.y:.1f}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
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
    //$scope.GetGenderWiseEmployees();
    //$scope.GetDesignationWiseEmployees();
}])