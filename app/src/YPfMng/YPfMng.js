var YPfMng = angular.module('YPfMng', ['ngResource', 'ngCookies']);
YPfMng.controller('MngCtrl', function ($scope, $timeout, $interval, $state, $cookies, requestService, mainService) {

    mainService.allorder_get().then(
        function (res) {
            $scope.orderinfo = res.data;
            $state.go("index.YPfMng.allorder");
            console.log($scope.orderinfo);
        }
    )
    //所有订单
    $scope.allorder = function () {

        mainService.allorder_get().then(
            function (res) {
                $scope.orderinfo = res.data;
                $state.go("index.YPfMng.allorder");
                console.log($scope.orderinfo);
            }
        )

    }
    //付款
    $scope.pay = function (sn) {
        mainService.paystatus_post(sn).then(
            function (res) {
                if (res.data == 1) {
                    alert('付款状态修改成功！');
                    $scope.allorder();
                }
            }
        )
    }
    //三维
    $scope.show3D = function (sn,prj_id) {
        $scope.order_sn = sn;
        var toDo = function () {
            console.log(sn);
            window.top.frames["viewer1"].order_sn = sn;
            window.top.frames["viewer1"].loadModels(prj_id);
            alert('正在加载三维模型，请稍等。。。');
        };
        $timeout(toDo,2000)
    }
})