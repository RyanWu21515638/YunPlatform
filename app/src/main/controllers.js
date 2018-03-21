'use strict';
var app = angular.module('app', ['angularFileUpload','ngResource'])
app.controller('AppController', ['$scope', '$cookies', '$state', '$timeout', 'FileUploader', 'mainService', '$rootScope',function ($scope, $cookies, $state,$timeout,FileUploader, mainService,$rootScope) {
    $scope.order_info = {};
    $scope.order_info.user_id = $cookies.get('user_id');
    var order_sn = 201700119174018;
    var prj_id = 2;
    var toDo = function () {
        console.log(order_sn);
        window.top.frames["viewer1"].order_sn = order_sn;
        window.top.frames["viewer1"].loadModels(prj_id);
		alert('正在加载三维模型，请稍等。。。');
    };
    $timeout(toDo,2000);
    //-----------------------iframe焦点控制-------------------
    var IframeOnClick = {
        resolution: 200,
        iframes: [],
        interval: null,
        Iframe: function () {
            this.element = arguments[0];
            this.cb = arguments[1];
            this.hasTracked = false;
        },
        track: function (element, cb) {
            this.iframes.push(new this.Iframe(element, cb));
            if (!this.interval) {
                var _this = this;
                this.interval = setInterval(function () {
                    _this.checkClick();
                }, this.resolution);
            }
        },
        checkClick: function () {
            if (document.activeElement) {
                var activeElement = document.activeElement;

                for (var i in this.iframes) {
                    if (activeElement === this.iframes[i].element) {// user is in this Iframe
                        if (this.iframes[i].hasTracked == false) {
                            this.iframes[i].cb.apply(window, []);
                            this.iframes[i].hasTracked = true;
                        }
                    } else {
                        this.iframes[i].hasTracked = false;
                    }
                }
            }
        }
    };
    IframeOnClick.track(document.getElementById("iframe1"), function () {
        $(document.body).css({
            "overflow-x": "hidden",
            "overflow-y": "hidden"
        });
    });
    $scope.scrollon = function () {
        //启用滚动条
        $(document.body).css({
            "overflow-x": "auto",
            "overflow-y": "auto"
        });
    }
$scope.hide = function () {
    $(document.body).css({
        "overflow-x": "hidden",
        "overflow-y": "hidden"
    });
}
    var uploader = $scope.uploader = new FileUploader({
        //url: 'app/build/upload.php'
        url: $rootScope.ip+'/designPlatform/upload.php'
    });

    // FILTERS
    // a sync filter
    uploader.filters.push({
        name: 'syncFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
            console.log('syncFilter');
            return this.queue.length < 1;
        }
    });

    // an async filter
    uploader.filters.push({
        name: 'asyncFilter',
        fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
            console.log('asyncFilter');
            setTimeout(deferred.resolve, 1e3);
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function (fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function (addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function (item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function (fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function (progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function (fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function (fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function (fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function (fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
        //单个文件传完之后修改文件名存入数据库
        console.log(response.order_no);
        $scope.order_info.order_no = response.order_no;
        $scope.order_info.origin_file = response.origin_file;

    };
    uploader.onCompleteAll = function () {
        console.info('onCompleteAll');
    };
    console.info('uploader', uploader);


    if($cookies.get('user_id'))
    {
        mainService.orderlist_get($cookies.get('user_id')).then(
            function (res) {
                $scope.orderinfo = res.data;
                console.log($scope.orderinfo);
            }
        )
    }
    else{
        alert('您还未登陆，请先登录!');
        $state.go("login");
    }
    //提交订单
    $scope.submit_order = function (order_type) {
    $scope.order_info.order_type = order_type;
        if($cookies.get('user_id'))
        {
            if($scope.order_info.order_no)
            {
                mainService.submit_order_post($scope.order_info).then(
                    function (res) {
                        if(res.data.success)
                        {
                            alert('提交订单成功，正在处理中，请您耐心等候！');
                            uploader.clearQueue();
                            $scope.order_info.order_no = '';
                            $scope.order_info.origin_file = '';
                            mainService.execAUTOCAD_post(res.data.order_no,res.data.order_type).then(
                                function (res) {
                                    //dosomething
                                }
                            )
                        }
                        if(res.data.message == '123')
                        {
                            alert('您当前有一个订单未付款，请先结束上一个订单！');
                        }
                    }
                )
            }
            else
            {
                alert('请先上传文件！');
            }
        }
        else {
            alert('您还未登录，请先登录！');
            $state.go("login");
        }

    };
    //拉取订单
    $scope.orderlist = function () {
        if($cookies.get('user_id'))
        {
            mainService.orderlist_get($cookies.get('user_id')).then(
                function (res) {
                    $scope.orderinfo = res.data;
                    $state.go("index.order.allorder");
                }
            )
        }
        else{
            alert('您还未登陆，请先登录!');
            $state.go("login");
        }
    }
    //删除订单
    $scope.delete_order = function () {
        mainService.delete_order_post($scope.order_sn).then(
            function (res) {
                if(res.data.success)
                {
                    alert('删除成功！');
                    $scope.orderlist();
                }
                else if(!res.data.error)
                {
                    alert('删除失败！');
                }
            }
        )
    }
    //记录要删除的订单号
    $scope.record_order_sn = function (sn) {
        $scope.order_sn = sn;
    }
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
}]);
