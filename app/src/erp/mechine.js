var mechine = angular.module('mechine',[]);
mechine
    .controller('mechineCtrl', function ($scope, $http, $state, flowService) {

        $scope.mechine = {};
        $scope.bl=true;//页面刷新变量
        //监听页面事件变化
        $scope.$watch('bl', function () {
            flowService.mechineselect().then(
                function (res) {
                    $scope.mechineinfo = res.data;
                }
            );
        });
        flowService.mechineselect().then(
            function (res) {
                $scope.mechineinfo = res.data;
            }
        );
        flowService.processselect().then(
            function (res) {
                $scope.process = res.data;
            }
        )
        $scope.addmc = function () {
            flowService.mechineadd($scope.mechine).then(
                function (res) {
                    alert('添加机台成功！');
                    $scope.bl=!$scope.bl;
                }
            )
        };
        $scope.deletemc = function (x) {
            $scope.mechine.machine_id = x;
            flowService.mechinedelete($scope.mechine).then(
                function (res) {
                    alert('删除机台成功！');
                    $scope.bl=!$scope.bl;
                }
            )
        };
        $scope.resetmc = function () {
            $scope.mechine = {};
        }
        $scope.jtback = function () {
            $state.go('index.YErp.taskallocated');
        }
    })