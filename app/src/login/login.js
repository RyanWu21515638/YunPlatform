var login = angular.module('login', ['ngResource', 'ngCookies']);
login.controller('loginCtrl', function ($scope, $timeout, $interval, $state, $cookies, $rootScope, requestService) {

    $scope.user_register_info = {};

    $scope.user_login_info = {};

    $scope.user_forget_info = {};
    $scope.text = "获取验证码";
    $scope.upgrade_company_info = {};
    $scope.settime = function () {
        $scope.countdown = 60;
        $scope.showtimer = true;
        $scope.timer = true;
        $scope.text = '秒之后重新获取';
        var counter = $interval(function () {
            $scope.countdown = $scope.countdown - 1;
        }, 1000);
        $timeout(function () {
            $scope.text = "获取验证码";
            $scope.countdown = 60;
            $scope.timer = false;
            //document.getElementById('yzmid').style.width= '8%';
            $interval.cancel(counter);
            $scope.showtimer = false;
        }, $scope.countdown * 1000);

        //document.getElementById('yzmid').style.width= '12%';

    }
    //获取手机验证码
    $scope.verification_code = function () {
        console.log($scope.user_register_info.telephone);
        requestService.verification_code_post($scope.user_register_info).then(
            function (res) {
                console.log('验证码' + res.data.rand);
            }
        )
    }
    //注册
    $scope.register = function () {
        console.log($scope.user_register_info);
        requestService.register_post($scope.user_register_info).then(
            function (res) {
                console.log(res.data);
                if (res.data.success) {
                    alert('注册成功！正在登陆中。。。');
                    $scope.user_login_info.username = $scope.user_register_info.name;
                    $scope.user_login_info.password = $scope.user_register_info.confirm_password;
                    $scope.login();
                }
                if (res.data.message == '994') {
                    alert('验证码错误！');
                }
            }
        )
    }
    $scope.todoSomething = function ($event) {
        if ($event.keyCode == 13) {//回车
            $scope.login();
        }
    }
    $scope.todoSomething2 = function ($event) {
        if ($event.keyCode == 13) {//回车
            $scope.loginCompany();
        }
    }
    //个人登录
    $scope.login = function () {
        //document.getElementById('pwerror').style.display = "none";
        if (!$scope.user_login_info.username || !$scope.user_login_info.password) {
            document.getElementById('pwerror').textContent = "用户名或者密码不能为空";
        }
        else {
            requestService.login_post($scope.user_login_info).then(
                function (res) {
                    if (res.data.success) {
                        var expireDate = new Date();
                        var register_time = res.data.user[0].create_time;
                        var yy=register_time.split("-")[0];
                        var mm=register_time.split("-")[1]-1;
                        var dd=register_time.split("-")[2].substring(0,2);
                        if(expireDate.getFullYear()>yy ||(expireDate.getMonth()>mm && expireDate.getDate()>dd) || ((expireDate.getDate()-dd)>=30))
                        {
                            alert('试用期已到！');
                        }
                        else {
                            var trial = 0;
                            if(expireDate.getMonth()>mm)
                            {
                                trial=dd-expireDate.getDate();
                            }
                            else
                            {
                                trial=30-(expireDate.getDate()-dd);
                            }
                            expireDate.setDate(expireDate.getDate() + 1);
                            $cookies.put('trial_date',trial,{'expires': expireDate});
                            $cookies.put('user_id', res.data.user[0].id, {'expires': expireDate});
                            $cookies.put('user_name', $scope.user_login_info.username, {'expires': expireDate});
                            $cookies.put('user_group', res.data.user[0].usergroup, {'expires': expireDate});
                            $cookies.put('password', $scope.user_login_info.password, {'expires': expireDate});
                            $cookies.put('signature', res.data.user[0].signature, {'expires': expireDate});
                            //$cookies.put('signature', 'A-777', {'expires': expireDate});
                            $rootScope.erp = false;
                            $cookies.put('erp', false, {'expires': expireDate});
                            $state.go('index.P_formwork.stairs');
                        }
                    }
                    else if (!res.data.error) {
                        document.getElementById('pwerror').textContent = "密码错误";
                    }
                }
            )
        }
    }
    //企业erp登录
    $scope.loginCompany = function () {
        if (!$scope.user_login_info.username || !$scope.user_login_info.password || !$scope.user_login_info.signature) {
            document.getElementById('pwerror2').textContent = "用户名，密码，企业秘钥不能为空";
        }
        else {
            requestService.login_company_post($scope.user_login_info).then(
                function (res) {
                    if (res.data.success)
                    {
                        var expireDate = new Date();
                        expireDate.setDate(expireDate.getDate() + 1);
                        $cookies.put('user_id', res.data.data.id, {'expires': expireDate});
                        $cookies.put('user_name', $scope.user_login_info.username, {'expires': expireDate});
                        $cookies.put('user_group', res.data.data.usergroup, {'expires': expireDate});
                        $cookies.put('signature', $scope.user_login_info.signature, {'expires': expireDate});
                        $rootScope.erp = true;
                        $cookies.put('erp', true, {'expires': expireDate});
                        $cookies.put('erp_group',res.data.data.usergroup);
                        switch (res.data.data.usergroup)
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
                    else
                    {
                        document.getElementById('pwerror2').textContent = "密码错误";
                    }

                }
            )
        }
    }
    //退出
    $scope.logout = function () {
        $scope.logged = false;
        $cookies.put('user_id', '');
    }
    //
    $scope.changeVerify = function () {
        document.getElementById('verifyimg').src = "http://192.168.3.158/designPlatform/home/user/getVerify";
    }
    //忘记密码
    $scope.forget_password = function () {
        requestService.forget_password_post($scope.user_register_info).then(
            function (res) {
                if (res.data.success) {
                    alert('密码修改成功！');
                }
                if (res.data.message == '120') {
                    alert('手机格式不正确！');
                }
                if (res.data.message == '121') {
                    alert('用户不存在！');
                }
                if (res.data.message == '122') {
                    alert('验证码错误！');
                }
                if (res.data.message == '123') {
                    alert('验证码超时！');
                }
                if (res.data.message == '124') {
                    alert('密码不能与上次修改密码相同！');
                }
                if (res.data.message == '125') {
                    alert('两次输入的密码不一致，请确认！');
                }

            }
        )
    }
    //判断手机是否被注册
    $scope.judgephone = function () {
        requestService.judgephone_get($scope.user_register_info.telephone).then(
            function (res) {
                if (res.data.registed) {
                    $scope.phoneregisted = true;
                }
                else {
                    $scope.phoneregisted = false;
                }
            }
        )
    }
    //判断用户名是否被注册
    $scope.judgename = function () {
        requestService.judgename_get($scope.user_register_info.name).then(
            function (res) {
                if (res.data.registed) {
                    $scope.nameregisted = true;
                }
                else {
                    $scope.nameregisted = false;
                }
            }
        )
    }
    //QQ在线支持

    $("#QQsupport").click(function () {
        //window.open('http://sighttp.qq.com/authd?IDKEY=96a228fefa522ae3ef9d616f3c00089affdad9ada24ffd80');
        window.open('http://sighttp.qq.com/authd?IDKEY=e472e99593e8e8a5f2199d57e8583959650212e06e641fd8');
    });

    //
    $scope.upgrade = function () {
        $scope.upgrade_company_info.user_id = $cookies.get('user_id');
        if ($scope.upgrade_company_info.name == null || $scope.upgrade_company_info.address == null) {
            alert('公司名称或者地址不允许为空！');
        }
        else {
            requestService.upgrade_company_post($scope.upgrade_company_info).then(
                function (res) {
                    alert('升级成功！请重新登录');
                    $state.go('login');
                }
            )
        }
    }
})

