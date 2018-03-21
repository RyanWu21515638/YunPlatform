var compare = angular.module('compare', ['ngResource','ngCookies']);
compare.controller('compareCtrl',function ($scope,$timeout,$interval,$state,$cookies,requestService,mainService) {

    $scope.dataincise = [];
    $scope.datapunch = [];
    $scope.userinfo ={};

    $scope.userinfo.user_id = $cookies.get('user_id');

    mainService.formwork_storage_get($scope.userinfo.user_id).then(
        function (res) {
            $scope.formwork_storage = res.data;
        }
    )
    mainService.formwork_compare_get($scope.userinfo.user_id).then(
        function (res) {
            $scope.formwork_compare = res.data;
            console.log(-($scope.formwork_compare.static[0].lack));
            $scope.dataincise.push({
                name: '缺板',
                y:parseInt(-($scope.formwork_compare.static[0].lack)),
                sliced: true,
                selected: true,
                color:'#c00'
            });
            $scope.dataincise.push({
                name: '已有板',
                y: parseInt($scope.formwork_compare.static[0].lack) + parseInt($scope.formwork_compare.static[0].subtotal),
                sliced: true,
                selected: true,
                color:'#003366'
            });
            $scope.datapunch.push({
                name: '缺板面积',
                y: parseInt(-($scope.formwork_compare.static[0].sum_area_lack)),
                sliced: true,
                selected: true,
                color:'#c00'
            });
            $scope.datapunch.push({
                name: '已有板面积',
                y: parseInt($scope.formwork_compare.static[0].sum_area_lack) + parseInt($scope.formwork_compare.static[0].sum_area),
                sliced: true,
                selected: true,
                color:'#003366'
            });
            $scope.changepie($scope.dataincise,$scope.datapunch);
        }
    )

    $scope.storage_clear_post = function () {
        mainService.storage_clear_post($scope.userinfo).then(
            function (res) {
                console.log('sssss');
            }
        )
    }
    $scope.changepie = function (dataincise, datapunch) {
        console.log(datapunch);
        $(document).ready(function () {
            var chart = {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            };

            var title1 = {
                text: '总数百分比'
            };
            var title2 = {
                text: '面积百分比'
            };

            var tooltip = {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            };
            var plotOptions = {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true
                    },
                    /*showInLegend: true*/
                }
            };
            var series1 = [{
                type: 'pie',
                name: '占比',
                data: dataincise,


            }];
            var series2 = [{
                type: 'pie',
                name: '占比',
                data: datapunch,

            }];

            var json1 = {};
            json1.chart = chart;
            json1.tooltip = tooltip;
            json1.title = title1;
            json1.series = series1;
            json1.plotOptions = plotOptions;

            var json2 = {};
            json2.chart = chart;
            json2.tooltip = tooltip;
            json2.title = title2;
            json2.series = series2;
            json2.plotOptions = plotOptions;

            $('#containerpie1').highcharts(json1);
            $('#containerpie2').highcharts(json2);
        });
    };
//导出Excel
    $scope.exportToExcel = function (x) {

        if(x==1)
        {
            var flname = '库存清单';
        }
        if(x==2)
        {
            var flname = '模板对比清单';
        }
        var time = new Date();
        if (time.getMonth() < 9)
            var month = '0' + (time.getMonth() + 1).toString();
        else
            var month = (time.getMonth() + 1).toString();
        if (time.getDate() <= 9)
            var date = '0' + time.getDate().toString();
        else
            var date = time.getDate().toString();
        if (time.getHours() <= 9)
            var hour = '0' + time.getHours().toString();
        else
            var hour = time.getHours().toString();
        if (time.getMinutes() <= 9)
            var minute = '0' + time.getMinutes().toString();
        else
            var minute = time.getMinutes().toString();
        if (time.getSeconds() <= 9)
            var second = '0' + time.getSeconds().toString();
        else
            var second = time.getSeconds().toString();
        $(".table2excel").table2excel({
            exclude: ".noExl",  // 不想导出的行加上class='noExl'即可
            name: "20160906", // excel sheetname好像不起作用~~~
            filename: flname + time.getFullYear().toString() + '-' + month + date + '-' + hour + minute + second, // excel文件名
            fileext: ".xls",//文件格式
            exclude_img: false,//图片
            exclude_links: true,//链接
            exclude_inputs: true//输入
        });
    };
})