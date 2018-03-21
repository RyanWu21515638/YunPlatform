var index = angular.module('index', ['ngResource', 'ngCookies']);
index.controller('indexCtrl', function ($scope, $timeout, $interval, $state, $cookies, $rootScope, $http) {
    $scope.trial = $cookies.get('trial_date');
    if ($cookies.get('user_id')) {
        $scope.logged = true;
        $scope.loggedname = $cookies.get('user_name');
        $scope.loggedgroup = $cookies.get('user_group');
        console.log($scope.loggedname);
    }
    else
        $scope.logged = false;

    $scope.postCfg = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function (data) {
            return $.param(data);
        }
    };
    $scope.logout = function () {
        $scope.logged = false;
        $cookies.put('user_id', '');
        $cookies.put('erp', false);
        $cookies.put('password', '');
        $cookies.put('signature', null);
        $cookies.put('user_group', '');
        $cookies.put('user_id', '');
        $cookies.put('user_name', '');
    }
    if ($cookies.get('erp') != 'true')
        $rootScope.erp = false;
    else
        $rootScope.erp = true;
    $scope.erpjuge = function () {
        if ($cookies.get('signature') == 'null')
            $state.go('index.YErp.erperror');
        else {
            $scope.formData = {};
            $scope.formData.username = $cookies.get('user_name');
            $scope.formData.password = $cookies.get('password');
            $scope.formData.signature = $cookies.get('signature');
            console.log($scope.formData);
            $http.post($rootScope.ip + "/rlerp/home/user/loginPOST", $scope.formData, $scope.postCfg).success(
                function (res) {
                    if (res.success) {
                        $rootScope.erp = true;
                        $cookies.put('erp', true);
                        $cookies.put('erp_group',res.data.usergroup);
                        switch (res.data.usergroup)
                        {
                            case '1':
                                $state.go('index.YErp.userinfo');
                                break;
                            case '2':
                                $state.go('index.YErp.highchart');
                                break;
                            case '4':
                                $state.go('index.YErp.cut');
                                break;
                            case '5':
                                $state.go('index.YErp.kboard');
                                break;
                            case '6':
                                $state.go('index.YErp.qualityinfo');
                                break;
                        }

                    }
                    else {
                        alert('请先登录！');
                        $state.go('login');
                    }
                }
            )

        }
    }
    $scope.hideerp = function () {
        $cookies.put('erp',false);
        $rootScope.erp = false;
    }
})

