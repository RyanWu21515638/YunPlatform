/**
 *用户操作
 * @type {[type]}
 */
var userModule = angular.module('UserModule', []);
userModule
    .controller('UserCtrl', function ($scope, $rootScope, $http ,$cookies,$state) {

        $scope.ngtest =function(x)
        {
            console.log(x);
        }
        //POST包头
        $scope.postCfg = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (data) {
                return $.param(data);
            }
        };
        //页面分页控制变量
        $scope.paginationConf = {
            currentPage: 1,
            totalItems: 22,
            itemsPerPage: 10,
            pagesLength: 10,
            perPageOptions: [10, 20, 30, 40, 50],
            /*onChange: function () {
            }*/
        };
        $scope.bl=true;//页面刷新变量
        //用户信息变量
        $scope.userinfo = {
        };
        //获取部门信息
        $http.get($rootScope.ip+"/rlerp/home/user/get_Department/").success(
            function (response) {
                $scope.department = response;
            });

        //监听页面事件变化
        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage + totalItems +bl', function (newValue, oldValue, scope) {
            $http.get($rootScope.ip+"/rlerp/home/user/get_Users/", {
                params: {
                    currentPage: $scope.paginationConf.currentPage,
                    itemsPerPage: $scope.paginationConf.itemsPerPage,
                    signature:$cookies.get('signature')
                }
            }).success(
                function (response) {
                    $scope.names = response.info;

                    $scope.paginationConf.totalItems = response.count;
                });
        });
        //页面刷新function
        $scope.pageChange = function () {
            if($scope.bl==false)
                $scope.bl=true;
            else $scope.bl=false;
            console.log($scope.bl);
        }
        $('#form-field-1').keypress(function(event){
            var c = $(this).val();
            if(event.keyCode == '13')
            {
            }
        });
        //添加用户信息function
        $scope.add = function () {
            $scope.userinfo.signature = $cookies.get('signature');
            $http.post($rootScope.ip+"/rlerp/home/user/add_Users", $scope.userinfo, $scope.postCfg).success(
                function (response) {
                    console.log(response);
                    if (response.error != '999') {
                        document.getElementById("label1").style.color = "green";
                        document.getElementById("label1").textContent = "添加成功！";
                        $scope.pageChange();
                    }
                    else {
                        document.getElementById("label1").style.color = "red";
                        document.getElementById("label1").textContent = "添加失败！该用户已经存在";
                    }

                }
            ).error(
                function () {
                    document.getElementById("label1").style.color = "red";
                    document.getElementById("label1").textContent = "添加失败！请输入完整信息";
                })
        }
        //重置function
        $scope.reset = function () {
            $scope.userinfo = {};
            document.getElementById("label1").textContent = "";
        }
        //删除用户function （参数id）
        $scope.delete = function (id) {
            $scope.userinfo.userid=id;
            $http.post($rootScope.ip+"/rlerp/home/user/del_Users", $scope.userinfo, $scope.postCfg).success(

                function (response) {
                    console.log(response);
                    if (response.error != '998') {
                        $scope.pageChange();
                        alert("删除成功！");
                    }
                    else {
                    }

                }
            ).error(
                function () {
                })
        }
        //修改用户信息function
        $scope.alt = function (x) {;
            console.log(x);
            $http.post($rootScope.ip+"/rlerp/home/user/alt_Users", x, $scope.postCfg).success(

                function (response) {
                    console.log(response);
                    if (response.error != '998') {
                        if(response == 1)
                        {
                            alert('修改成功');
                            $scope.pageChange();
                        }

                    }
                    else {
                    }

                }
            ).error(
                function () {
                })
        }
        //修改密码
        $scope.altPassWord = function (x,y) {
            console.log(x,y);
            $scope.userinfo.userid= $cookies.get('userid');
            $scope.userinfo.oldpassword= x;
            $scope.userinfo.password=y ;
            console.log($scope.userinfo);
            $http.post($rootScope.ip+"/rlerp/home/user/Update_Password", $scope.userinfo, $scope.postCfg).success(

                function (response) {
                    console.log(response.error);
                    if (response.success == '998') {
                        alert('修改成功!请重新登录');
                        $cookies.remove('username');
                        $cookies.remove('password');
                        $cookies.remove('userid');
                        $cookies.remove('userrole');
                        $cookies.remove('prjid');
                        $cookies.remove('prjname');
                        $state.go("index");
                    }
                    else if(response.error == '404')
                    {

                    }
                    else if(response.error == '995'){
                        alert('旧密码不正确！');
                    }

                }
            ).error(
                function () {
                })

        }
        //
        $scope.onFileSelect = function($files,$upload)
        {
            $scope.upload = $upload.upload({
                url: '/rlerp/Public/upload.php',
                data: {myObj: $scope.myModelObj},
                file: file,
            }).progress(function(evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function(data, status, headers, config) {        // file is uploaded successfully
                console.log(data);
            });
        }
    });