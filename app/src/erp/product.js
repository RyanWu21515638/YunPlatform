var productModule = angular.module('productModule', ['angularTreeview', 'ngResource']);
productModule
    .controller('productCtrl', function ($scope, $rootScope, $http, $timeout, $interval,$cookies) {
            //参数初始化
            $('#scan').focus();
            $scope.scanner = {};               //存储 扫描数据
            $scope.reprintid = new Array();    //存储需要补印的行索引
            $scope.reprintchosen = new Array();//存储需要补印的id
            $scope.i = 0;                      //打印时控制循环
            $scope.j = 0;                      //补印时控制循环
            $scope.printorreprinted = 1;       //控制打印功能(打印、暂停、继续打印)
            $scope.inputgj = true;             //打印时 构件下拉框(enable,disable)
            $scope.inputprj = true;            //打印时 项目下拉框(enable,disable)
            $scope.inputprt = true;            //打印时 分区下拉框(enable,disable)
            $scope.inputpckage = true;         //打印时 包号下拉框(enable,disable)
            $scope.choseall = false;

            $scope.prt = new Array(false);
            $scope.postCfg = {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (data) {
                    return $.param(data);
                }
            };

            //
            $scope.louti_id = '';
            $scope.scrollon = function () {
                //启用滚动条
                $(document.body).css({
                    "overflow-x": "auto",
                    "overflow-y": "auto"
                });

            }
            //
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
            IframeOnClick.track(document.getElementById("iframe2"), function () {
                $(document.body).css({
                    "overflow-x": "hidden",
                    "overflow-y": "hidden"
                });
            });
            // $http.get($rootScope.ip+'/rlerp/index.php/Home/Project?company_id='+$cookies.get('signature')).success(
            $http.get($rootScope.ip+'/rlerp/Home/Project?company_id=1').success(
                function (res) {
                    if (res) {
                        $scope.prj = res;
                    }
                    else {
                        alert("获取项目id失败");
                    }
                }).error(function () {
                alert("an unexpected error ocurred!");
            });
            $http.get($rootScope.ip+'/designPlatform/Home/Project/select_Project_id').success(
                function (res) {
                    if (res) {
                        $scope.prj = res;
                    }
                    else {
                        alert("获取项目id失败");
                    }
                }).error(function () {
                alert("an unexpected error ocurred!");
            });

            $scope.change1 = function (part_id, package_id) {
                /*window.top.frames["viewer1"].clearModels();*/

                $http.get($rootScope.ip + '/rlerp/home/Formwork/select_Formwork_List?prj_id=' + $scope.project_id + '&part_id=' + part_id + '&package_id=' + package_id).success(
                    function (res) {
                        if (res) {
                            $scope.formworklouti = res.data;
                            for (var i = 0; i < $scope.formworklouti.length; i++) {
                                window.top.frames["viewer1"].order_sn = $scope.project_id;
                                window.top.frames["viewer1"].addOneFormwork($scope.formworklouti[i].fromwork_id);
                            }
                        }
                        else {
                            alert("获取项目id失败");
                        }
                    }).error(function () {
                    alert("an unexpected error ocurred!");
                });
            }
            $scope.change2 = function (prj_id) {
                $scope.project_id = prj_id;

                $http.get($rootScope.ip + '/rlerp/home/Formwork/Edit_Project?prj_id=' + prj_id).success(
                    function (res) {
                        $scope.partinfo = res.num;
                    }).error(function () {
                    alert("an unexpected error ocurred!");
                });
            }
            //20180115
        $scope.changeforshow = function (prj_id) {
            $scope.project_id = prj_id;
            $http.get($rootScope.ip + '/designPlatform/home/Formwork/select_all_formwork?prj_id=' + prj_id).success(
                function (res) {
                    $scope.select_all_formwork_info = res;
                    for(var i =0;i<$scope.select_all_formwork_info.length;i++)
                    {
                        if($scope.select_all_formwork_info[i].isscanned =='1'){
                            window.top.frames["viewer1"].order_sn = $scope.project_id;
                            window.top.frames["viewer1"].addOneFormwork($scope.select_all_formwork_info[i].f_id);

                        }
                        if($scope.select_all_formwork_info[i].ispackaged =='1'){
                            window.top.frames["viewer2"].order_sn = $scope.project_id;
                            window.top.frames["viewer2"].addOneFormwork($scope.select_all_formwork_info[i].f_id);
                        }
                    }

                }).error(function () {
                alert("an unexpected error ocurred!");
            });
        }
            var changeforshow = function () {
                $http.get($rootScope.ip + '/designPlatform/home/Formwork/select_all_formwork?prj_id=' + $scope.project_id).success(
                    function (res) {
                        $scope.select_all_formwork_info = res;
                        for(var i =0;i<$scope.select_all_formwork_info.length;i++)
                        {
                            if($scope.select_all_formwork_info[i].isscanned =='1'){
                                window.top.frames["viewer1"].order_sn = $scope.project_id;
                                window.top.frames["viewer1"].addOneFormwork($scope.select_all_formwork_info[i].f_id);

                            }
                            if($scope.select_all_formwork_info[i].ispackaged =='1'){
                                window.top.frames["viewer2"].order_sn = $scope.project_id;
                                window.top.frames["viewer2"].addOneFormwork($scope.select_all_formwork_info[i].f_id);
                            }
                        }

                    }).error(function () {
                    alert("an unexpected error ocurred!");
                });
            }
            //添加备注
            $scope.addBZ = function (formwork_id) {
                $scope.dabaobz = '';
                $scope.dabaobz_formwork_id = formwork_id;
            }
            //更新备注
            $scope.updateRemark = function () {
                $http.get($rootScope.ip + '/designPlatform/home/Formwork/update_remark?formwork_id=' + $scope.dabaobz_formwork_id+'&remark='+$scope.dabaobz).success(
                    function (res) {
                        changeforshow();
                    }
                ).error(function () {

                })
            }
            $scope.select_package = function (part_id, package_id) {
                $scope.part_id = part_id;
                $scope.package_id = package_id;
                $http.get($rootScope.ip + '/rlerp/home/Formwork/select_Formwork_List?prj_id=' + $scope.project_id + '&part_id=' + part_id + '&package_id=' + package_id).success(
                    function (res) {
                        if (res) {
                            $scope.formworklouti = res;
                            $scope.show3D2();
                        }
                        else {
                            alert("获取项目id失败");
                        }
                    }).error(function () {
                    alert("an unexpected error ocurred!");
                });
            }
            $scope.show3D = function (fromwork_id) {
                window.top.frames["viewer1"].order_sn = $scope.project_id;
                window.top.frames["viewer1"].loadOneFormwork(fromwork_id);

            }
            $scope.show3D2 = function () {
                for (var i = 0; i < $scope.formworklouti.length; i++) {
                    if ($scope.formworklouti[i].ispackaged == 1) {
                        window.top.frames["viewer2"].order_sn = $scope.project_id;
                        window.top.frames["viewer2"].addOneFormwork($scope.formworklouti[i].fromwork_id);
                    }
                }
            }
            $scope.printlt = function (x, y) {
                var data = {};
                data.formwork_id = x;
                $http.post($rootScope.ip + '/designPlatform/home/Formwork/save_Formwork_Isprinted', data, $scope.postCfg).success(
                    function (res) {
                        if (res) {
                            $http.get($rootScope.ip + '/designPlatform/home/Formwork/select_Formwork_List?number=' + $scope.project_id).success(
                                function (res) {
                                    if (res) {
                                        $scope.formworklouti = res;

                                    }
                                    else {
                                        alert("获取项目id失败");
                                    }
                                }).error(function () {
                                alert("an unexpected error ocurred!");
                            });
                        }
                        else {
                            alert("记录失败");
                        }
                    }).error(function () {
                    alert("an unexpected error ocurred!");
                });


                $('#qrcode').html('');
                var qrcode = new QRCode(document.getElementById("qrcode"), {
                    width: 130,
                    height: 130,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                });
                qrcode.makeCode('000000' + x + '-' + y);
                $scope.timerls = $timeout(function () {
                    LODOP = getLodop();
                    LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");


                    LODOP.SET_PRINT_STYLE("FontSize", 16);
                    LODOP.SET_PRINT_STYLE("Bold", 1);
                    LODOP.ADD_PRINT_TEXT(20, 10, 2000, 200, y);

                    LODOP.SET_PRINT_STYLE("FontSize", 14);
                    LODOP.SET_PRINT_STYLE("Bold", 1);
                    LODOP.ADD_PRINT_TEXT(40, 10, 2000, 200, '---------------------------');

                    LODOP.SET_PRINT_STYLE("FontSize", 12);
                    LODOP.SET_PRINT_STYLE("Bold", 1);
                    LODOP.ADD_PRINT_TEXT(65, 10, 2000, 200, '天韵水岸8#楼梯');

                    LODOP.SET_PRINT_STYLE("FontSize", 14);
                    LODOP.SET_PRINT_STYLE("Bold", 1);
                    LODOP.ADD_PRINT_TEXT(105, 10, 2000, 200, '区域：');
                    LODOP.SET_PRINT_STYLE("FontSize", 16);
                    LODOP.SET_PRINT_STYLE("Bold", 1);
                    LODOP.ADD_PRINT_TEXT(105, 80, 2000, 200, 1);

                    LODOP.SET_PRINT_STYLE("FontSize", 14);
                    LODOP.SET_PRINT_STYLE("Bold", 1);
                    LODOP.ADD_PRINT_TEXT(125, 10, 2000, 200, '包号：');
                    LODOP.SET_PRINT_STYLE("FontSize", 16);
                    LODOP.SET_PRINT_STYLE("Bold", 1);
                    LODOP.ADD_PRINT_TEXT(125, 80, 2000, 200, 1);

                    LODOP.SET_PRINT_STYLE("FontSize", 12);
                    LODOP.SET_PRINT_STYLE("Bold", 1);
                    LODOP.ADD_PRINT_TEXT(165, 10, 2000, 200, '深圳市鈤励科技');


                    /*LODOP.SET_PRINT_STYLE("FontSize", 14);
                     LODOP.SET_PRINT_STYLE("Bold", 1);
                     LODOP.ADD_PRINT_TEXT(115, 10, 2000, 200, '构件详情：');
                     LODOP.SET_PRINT_STYLE("FontSize", 14);
                     LODOP.SET_PRINT_STYLE("Bold", 0);
                     LODOP.ADD_PRINT_TEXT(115, 100, 2000, 200, x);
                     LODOP.SET_PRINT_STYLE("FontSize", 12);
                     LODOP.SET_PRINT_STYLE("Bold", 0);
                     LODOP.ADD_PRINT_TEXT(145, 20, 2000, 200, x);
                     LODOP.SET_PRINT_STYLE("FontSize", 12);
                     LODOP.SET_PRINT_STYLE("Bold", 0);
                     LODOP.ADD_PRINT_TEXT(165, 20, 2000, 200, x);*/
                    LODOP.ADD_PRINT_HTM(65, 145, 2000, 2000, document.getElementById("qrcode").innerHTML);
                    LODOP.PREVIEW();
                    //LODOP.PRINT();
                }, 500);

            }

            //打包时扫码,记录、刷新列表(根据模板id查询到项目id)，加载三维模型
            $scope.ltscan = function (e) {
                if (e.keyCode == 13) {
                    var toDo = function () {
                        var data = {};
                        data.formwork_id = $scope.louti_id.split('-')[0];
                        $http.post($rootScope.ip + '/designPlatform/home/Formwork/save_Formwork_Isscanned', data, $scope.postCfg).success(
                            function (res) {
                                if (res) {
                                    //$scope.select_package($scope.part_id,$scope.package_id);
                                    window.top.frames["viewer1"].order_sn = $scope.project_id;
                                    window.top.frames["viewer1"].addOneFormwork(data.formwork_id);
                                    changeforshow();
                                }
                                else {
                                    alert("记录失败");
                                }
                            }).error(function () {
                            alert("an unexpected error ocurred!");
                        });

                        $scope.louti_id = '';
                    };
                    $timeout(toDo, 1500);
                }
            }

            $scope.package = function () {

                var data = {};
                data.number = $scope.project_id;
                $http.post($rootScope.ip + '/designPlatform/home/Formwork/save_Fromwork_Packaged', data, $scope.postCfg).success(
                    function (res) {
                        if (res.success == true) {
                            alert("成功打包");
                            $scope.changeforshow($scope.project_id);
                            window.top.frames["viewer1"].clearModels();
                        }
                        if (res.success == false) {
                            alert("模板不齐，无法打包");
                        }
                    }).error(function () {
                    alert("an unexpected error ocurred!");
                });
            }
            $scope.clearPackage = function () {

                var data = {};
                data.number = $scope.project_id;
                $http.post($rootScope.ip + '/designPlatform/home/Formwork/change_Package_Isscanned', data, $scope.postCfg).success(
                    function (res) {
                        $scope.changeforshow($scope.project_id);
                        window.top.frames["viewer1"].clearModels();
                        window.top.frames["viewer2"].clearModels();
                    }).error(function () {
                    alert("an unexpected error ocurred!");
                });
            }


            //************************************************************************************************************************************


            //存储需补印项目算法
            $scope.select = function (id) {
                $scope.selected_id = id;
                var n = 0;
                for (var m = 0; m < $scope.groupdt.length; m++) {
                    if ($scope.groupdt[m].id === id) {
                        n = m;
                        break;
                    }
                }
                if ($scope.reprintchosen[id]) {
                    $scope.reprintchosen[id] = false;
                    var l = $scope.reprintid.length;
                    while (l--) {
                        if ($scope.reprintid[l] === n) {
                            $scope.reprintid.splice(l, 1);
                        }
                    }
                    //window.top.frames["viewer2"].removeOneFormwork(id);
                }
                else {
                    $scope.reprintchosen[id] = true;
                    var l = $scope.reprintid.length;
                    while (l--) {
                        if ($scope.reprintid[l] === n) {
                            $scope.reprintid.splice(l, 1);
                        }
                    }
                    $scope.reprintid.push(n);
                    //window.top.frames["viewer2"].addOneFormwork(id);
                }
            }
            //清除打印记录
            $scope.clearprint = function () {
                $http.get('/rlerp/Home/Formwork/grp2?', {
                    params: {
                        prj_id: $scope.project_id,
                        gj: $scope.goujian_x,
                        package_id: $scope.pckageid,
                        partition_id: $scope.prtitionid,
                    }
                }).success(
                    function (res) {
                        if (res.detail) {
                            $scope.groupdetail = res.detail;
                            //window.top.frames["viewer1"].loadModels($scope.groupdetail[0].project_id, $scope.groupdetail[0].partition_id, $scope.groupdetail[0].package_id, $scope.groupdetail[0].component_no)
                        }
                        else {
                            alert("请先选择区域");
                        }
                    }).error(function () {
                    alert("an unexpected error ocurred!");
                });
                document.getElementById("print").textContent = "打印二维码";
                $scope.i = 0;
                $scope.printorreprinted = 1;
                $scope.inputgj = true;
                $scope.inputprj = true;
                $scope.inputprt = true;
                $scope.inputpckage = true;
                $interval.cancel($scope.timer);
                $timeout.cancel($scope.timer2);
                $interval.cancel($scope.timer3);
                $timeout.cancel($scope.timer4);
            }
            $scope.linshi = function (x, y, z, z1) {
                $('#qrcodelinshi').html('');
                var qrcode = new QRCode(document.getElementById("qrcodelinshi"), {
                    width: 140,
                    height: 140,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                });
                qrcode.makeCode(x + ',' + y + ',' + z + ',' + z1);
                document.getElementById("ip1").value = '';
                document.getElementById("ip2").value = '';
                document.getElementById("ip3").value = '';
                document.getElementById("ip4").value = '';
                $scope.timerls = $timeout(function () {
                    LODOP = getLodop();
                    LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");

                    LODOP.SET_PRINT_STYLE("FontSize", 14);
                    LODOP.SET_PRINT_STYLE("Bold", 1);
                    LODOP.ADD_PRINT_TEXT(55, 10, 2000, 200, '区域：');
                    LODOP.SET_PRINT_STYLE("FontSize", 16);
                    LODOP.SET_PRINT_STYLE("Bold", 1);
                    LODOP.ADD_PRINT_TEXT(55, 80, 2000, 200, x);

                    LODOP.SET_PRINT_STYLE("FontSize", 14);
                    LODOP.SET_PRINT_STYLE("Bold", 1);
                    LODOP.ADD_PRINT_TEXT(85, 10, 2000, 200, '包号：');
                    LODOP.SET_PRINT_STYLE("FontSize", 16);
                    LODOP.SET_PRINT_STYLE("Bold", 1);
                    LODOP.ADD_PRINT_TEXT(85, 80, 2000, 200, y);


                    LODOP.SET_PRINT_STYLE("FontSize", 14);
                    LODOP.SET_PRINT_STYLE("Bold", 1);
                    LODOP.ADD_PRINT_TEXT(115, 10, 2000, 200, '构件详情：');
                    LODOP.SET_PRINT_STYLE("FontSize", 14);
                    LODOP.SET_PRINT_STYLE("Bold", 0);
                    LODOP.ADD_PRINT_TEXT(115, 100, 2000, 200, z.substring(0, 1));
                    LODOP.SET_PRINT_STYLE("FontSize", 12);
                    LODOP.SET_PRINT_STYLE("Bold", 0);
                    LODOP.ADD_PRINT_TEXT(145, 20, 2000, 200, z.substring(1));
                    LODOP.SET_PRINT_STYLE("FontSize", 12);
                    LODOP.SET_PRINT_STYLE("Bold", 0);
                    LODOP.ADD_PRINT_TEXT(165, 20, 2000, 200, z1);

                    LODOP.ADD_PRINT_HTM(55, 145, 2000, 2000, document.getElementById("qrcodelinshi").innerHTML);

                    LODOP.PREVIEW();

                }, 500);

            }
            //80x60标签设定，最好做成可调用的设定
            $scope.CreateOneFormPage = function (i) {
                LODOP = getLodop();
                LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
                LODOP.SET_PRINT_STYLE("FontSize", 10);
                LODOP.SET_PRINT_STYLE("Bold", 0);
                LODOP.ADD_PRINT_TEXT(85, 10, 2000, 200, $scope.groupdetail[i].project_name);

                LODOP.SET_PRINT_STYLE("FontSize", 15);
                LODOP.SET_PRINT_STYLE("Bold", 1);
                LODOP.ADD_PRINT_TEXT(185, 10, 2000, 200, "鈤励科技");

                if ($scope.groupdetail[i].number.length > 14)
                    LODOP.SET_PRINT_STYLE("FontSize", 20);
                else
                    LODOP.SET_PRINT_STYLE("FontSize", 28);
                LODOP.SET_PRINT_STYLE("Bold", 1);
                LODOP.ADD_PRINT_TEXT(20, 10, 2000, 2000, $scope.groupdetail[i].number);
                LODOP.ADD_PRINT_TEXT(44, 10, 2000, 2000, "-----------------------");

                LODOP.SET_PRINT_STYLE("FontSize", 10);
                LODOP.SET_PRINT_STYLE("Bold", 1);
                LODOP.ADD_PRINT_TEXT(65, 10, 2000, 2000, "序号:" + (i + 1));

                LODOP.SET_PRINT_STYLE("FontSize", 12);
                LODOP.SET_PRINT_STYLE("Bold", 0);
                LODOP.ADD_PRINT_TEXT(135, 10, 2000, 200, "包号:" + $scope.groupdetail[i].package_name);

                LODOP.SET_PRINT_STYLE("FontSize", 12);
                LODOP.SET_PRINT_STYLE("Bold", 0);
                LODOP.ADD_PRINT_TEXT(160, 10, 2000, 200, "构件号:" + $scope.groupdetail[i].component_no);

                LODOP.SET_PRINT_STYLE("FontSize", 12);
                LODOP.SET_PRINT_STYLE("Bold", 0);
                LODOP.ADD_PRINT_TEXT(110, 10, 2000, 200, "分区号:" + $scope.groupdetail[i].name);

                LODOP.ADD_PRINT_HTM(68, 165, 2000, 2000, document.getElementById("qrcode").innerHTML);
            };
            //补印设定
            $scope.CreateOneFormPage2 = function (i) {
                LODOP = getLodop();
                LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
                LODOP.SET_PRINT_STYLE("FontSize", 13);
                LODOP.SET_PRINT_STYLE("Bold", 1);
                LODOP.ADD_PRINT_TEXT(105, 160, 2000, 200, '志特:Tower D');

                /*LODOP.SET_PRINT_STYLE("FontSize", 15);
                 LODOP.SET_PRINT_STYLE("Bold", 1);
                 LODOP.ADD_PRINT_TEXT(185, 10, 2000, 200, "鈤励科技");*/

                if ($scope.groupdt[i].number.length > 14)
                    LODOP.SET_PRINT_STYLE("FontSize", 16);
                else
                    LODOP.SET_PRINT_STYLE("FontSize", 28);
                LODOP.SET_PRINT_STYLE("Bold", 1);
                LODOP.ADD_PRINT_TEXT(20, 10, 2000, 2000, $scope.groupdt[i].number);
                LODOP.ADD_PRINT_TEXT(44, 10, 2000, 2000, "-----------------------");

                LODOP.SET_PRINT_STYLE("FontSize", 10);
                LODOP.SET_PRINT_STYLE("Bold", 0);
                LODOP.ADD_PRINT_TEXT(65, 160, 2000, 2000, "NO:" + (i + 1));

                /*LODOP.SET_PRINT_STYLE("FontSize", 12);
                 LODOP.SET_PRINT_STYLE("Bold", 0);
                 LODOP.ADD_PRINT_TEXT(135, 10, 2000, 200, "包号:" + $scope.groupdt[i].package_name);*/

                LODOP.SET_PRINT_STYLE("FontSize", 13);
                LODOP.SET_PRINT_STYLE("Bold", 1);
                LODOP.ADD_PRINT_TEXT(160, 160, 2000, 200, $scope.groupdt[i].construction_no);

                /*LODOP.SET_PRINT_STYLE("FontSize", 12);
                 LODOP.SET_PRINT_STYLE("Bold", 0);
                 LODOP.ADD_PRINT_TEXT(110, 10, 2000, 200, "分区号:" + $scope.groupdt[i].name);*/

                LODOP.ADD_PRINT_HTM(68, 10, 140, 140, document.getElementById("qrcode2").innerHTML);
            };
            //质检选取表模板加载三维和加工图
            $scope.show = function (x, y) {
                document.getElementById('h2').textContent = y;
                /*$scope.generateQrcode();*/
                //三维模型显示
                window.top.frames["viewer1"].loadOneFormwork(x);
                //加工图显示
                //var mynode = document.getElementById("example1");
                //PDFObject.embed("myfile.pdf", mynode, {width: "1130px", height: "1200px"});
            };
            //页面生成二维码
            $scope.generateQrcode = function (i) {
                $('#qrcode').html('');
                var qrcode = new QRCode(document.getElementById("qrcode"), {
                    width: 140,
                    height: 140,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                });
                qrcode.makeCode($scope.groupdetail[i].id + ',' + $scope.groupdetail[i].package_id + ',' + $scope.groupdetail[i].name + ',' + $scope.groupdetail[i].project_id + ',' + $scope.groupdetail[i].number);
                //打印记录
                $scope.printrecord($scope.groupdetail[i].id, $scope.groupdetail[i].package_id, $scope.groupdetail[i].project_id, $scope.groupdetail[i].partition_id, $scope.groupdetail[i].component_no);
                //LODOP.PREVIEW();
                console.log("timeouttest" + "$scope.i" + $scope.i + "detalilength" + $scope.groupdetail.length);
                if ($scope.i + 1 >= $scope.groupdetail.length) {
                    console.log("移除定时器");
                    $interval.cancel($scope.timer);
                    $scope.inputgj = true;
                    $scope.inputprj = true;
                    $scope.inputprt = true;
                    $scope.inputpckage = true;
                    document.getElementById("print").textContent = "打印二维码";
                }
                $scope.i = $scope.i + 1;
            }
            //供扫描枪调用，添加模板
            $scope.hrnumb = 0;
            $scope.mykeyadd = function (e) {
                document.getElementById("label1").textContent = "";
                document.getElementById("label2").textContent = "";
                if (e.keyCode == 13) {
                    if ($scope.scanner.ad.substring(2, 16) == 'Assembly code:')
                        $scope.scannid = $scope.scanner.ad.substring(16, 32);

                    $http.get('/rlerp/Home/Formwork/getIdByConstraction?', {
                        params: {
                            formwork_id: $scope.scannid,
                        }
                    }).success(function (res) {
                        console.log(res.id[0].id);
                        $scope.scannid = res.id[0].id;
                    }).error(function () {
                    });

                    window.top.frames["viewer2"].addOneFormwork($scope.scannid);


                    //查询模板相关信息，打包前的动作
                    $http.get('/rlerp/Home/Formwork/getGroupInfoByFmkId?', {
                        params: {
                            formwork_id: $scope.scannid,//$scope.scanner.ad.split(',')[0],
                        }
                    }).success(
                        function (res) {
                            if (res.detail) {
                                $http.get('/rlerp/Home/Formwork/grp?', {
                                    params: {
                                        prj_id: res.detail.project_id,
                                        gj: res.detail.component_no,
                                        package_id: res.detail.package_id,
                                        partition_id: res.detail.partition_id,
                                    }
                                }).success(
                                    function (response) {
                                        if (response) {
                                            $rootScope.groupdt = response;
                                            for (var i = 0; i < $rootScope.groupdt.length; i++) {
                                                if ($rootScope.groupdt[i].id == $scope.scannid) {
                                                    $scope.groupdtname = $rootScope.groupdt[i].partition_name;
                                                    $scope.groupdtpackage_name = $rootScope.groupdt[i].package_name;
                                                    $scope.groupdtcomponent_no = $rootScope.groupdt[i].component_no;
                                                    $scope.package_number = $rootScope.groupdt[i].number;
                                                }
                                            }
                                            if (res.isscanned) {


                                            }
                                            else {
                                                document.getElementById("label1").textContent = "扫描成功！";
                                                document.getElementById("label1").style.color = "red";

                                            }
                                        }
                                        else {
                                            alert("weizhicuowu");
                                        }
                                    }).error(function () {
                                    alert("ERROR！数据库连接错误或者打包已完成，无需再扫描");
                                });
                            }
                            else {
                                document.getElementById("label1").textContent = "获取该模板所在构件失败!";
                                document.getElementById("label1").style.color = "red";
                            }
                        }).error(function () {
                        alert("an unexpected error ocurred!");
                    });
                    $scope.scanner.ad = "";
                }

            };

            $scope.mykeyaddrl = function (e) {
                document.getElementById("label1").textContent = "";
                document.getElementById("label2").textContent = "";

                if (e.keyCode == 13) {

                    console.log($scope.scanner.adrl.split(',')[0]);
                    //$scope.package_number = $scope.scanner.adrl.split(',')[4];
                    $scope.scannid = $scope.scanner.adrl.split(',')[0];
                    window.top.frames["viewer2"].addOneFormwork($scope.scannid);

                    //查询模板相关信息，打包前的动作
                    $http.get('/rlerp/Home/Formwork/getGroupInfoByFmkId?', {
                        params: {
                            formwork_id: $scope.scanner.adrl.split(',')[0],
                        }
                    }).success(
                        function (res) {
                            if (res.detail) {
                                $http.get('/rlerp/Home/Formwork/grp?', {
                                    params: {
                                        prj_id: res.detail.project_id,
                                        gj: res.detail.component_no,
                                        package_id: res.detail.package_id,
                                        partition_id: res.detail.partition_id,
                                    }
                                }).success(
                                    function (response) {
                                        if (response) {
                                            $rootScope.groupdt = response;
                                            for (var i = 0; i < $rootScope.groupdt.length; i++) {
                                                if ($rootScope.groupdt[i].id == $scope.scannid) {
                                                    $scope.groupdtname = $rootScope.groupdt[i].partition_name;
                                                    $scope.groupdtpackage_name = $rootScope.groupdt[i].package_name;
                                                    $scope.groupdtcomponent_no = $rootScope.groupdt[i].component_no;
                                                    $scope.package_number = $rootScope.groupdt[i].number;
                                                }
                                            }
                                            if (res.isscanned) {


                                            }
                                            else {
                                                document.getElementById("label1").textContent = "已经扫描过！";
                                                document.getElementById("label1").style.color = "red";

                                            }
                                        }
                                        else {
                                            alert("weizhicuowu");
                                        }
                                    }).error(function () {
                                    alert("ERROR！数据库连接错误或者打包已完成，无需再扫描");
                                });
                            }
                            else {
                                document.getElementById("label1").textContent = "获取该模板所在构件失败!";
                                document.getElementById("label1").style.color = "red";
                            }
                        }).error(function () {
                        alert("an unexpected error ocurred!");
                    });
                    $scope.scanner.adrl = "";
                }
                $scope.hrnumb = 0;
            };
            //清空打包
            $scope.clearpackage = function () {
                $http.get('/rlerp/Home/Formwork/clearpackage?', {
                    params: {
                        component_no: $rootScope.groupdt[0].component_no,
                    }
                }).success(function (res) {
                    $http.get('/rlerp/Home/Formwork/grp?', {
                        params: {
                            prj_id: $rootScope.groupdt[0].project_id,
                            gj: $rootScope.groupdt[0].component_no,
                            package_id: $rootScope.groupdt[0].package_id,
                            partition_id: $rootScope.groupdt[0].partition_id,
                        }
                    }).success(
                        function (response) {
                            if (response) {
                                $rootScope.groupdt = response;
                                $scope.change11($rootScope.groupdt[0].project_id);
                            }
                            else {
                                alert("weizhicuowu");
                            }
                        }).error(function () {
                        alert("ERROR！数据库连接错误或者打包已完成，无需再扫描");
                    });
                }).error(function () {
                });
            }
            //确认是否可以打包
            $scope.ensurepackage = function () {
                var sm = false;
                for (var s = 0; s < $scope.groupdt.length; s++) {
                    /*if($scope.groupdt[s].ispackaged == "1")
                     {
                     alert('已经打包过了！');
                     break;
                     }
                     else*/
                    if ($scope.groupdt[s].isscanned !== "1") {
                        sm = true;
                        break;
                    }
                }
                if (sm) {
                    alert("还未扫描完，不能打包");
                }
                else {
                    for (var i = 0; i < $rootScope.groupdt.length; i++) {
                        $http.get('/rlerp/Home/Formwork/getGroupInfoByFmkId2?', {
                            params: {
                                formwork_id: $rootScope.groupdt[i].id,
                            }
                        }).success(
                            function (response) {
                                if (response) {
                                    document.getElementById("label2").textContent = "扫描完毕，已打包";
                                    window.top.frames["viewer2"].clearModels();
                                }
                                else {
                                    alert("");
                                }
                            }).error(function () {
                            alert("ERROR！");
                        });
                    }


                    $("#tree1").removeData("tree");
                    //清空事件
                    $("#tree1").unbind('click');
                    /*
                     $http.get('/rlerp/Home/Formwork/getAllForTree?project_id=' + $rootScope.projectid).success(
                     function (res) {
                     if (res) {
                     var tree_data = res;
                     var treeDataSource = new DataSourceTree({data: tree_data});
                     console.log(treeDataSource);
                     $('#tree1').ace_tree({
                     dataSource: treeDataSource,
                     multiSelect: false,
                     loadingHTML: '<div class="tree-loading"><i class="icon-refresh icon-spin blue"></i></div>',
                     'open-icon': 'icon-minus',
                     'close-icon': 'icon-plus',
                     'selectable': true,
                     'selected-icon': 'icon-ok',
                     'unselected-icon': 'icon-remove'
                     }).on('selected', function (evt, data) {
                     console.log(data);
                     console.log(data.info[0].name1);
                     $rootScope.groupdt = null;
                     $scope.treeselect = data.info[0].name1;

                     $http.get('/rlerp/Home/Formwork/grp?', {
                     params: {
                     gj: $scope.treeselect.split(',')[2],
                     package_id: $scope.treeselect.split(',')[1],
                     partition_id: $scope.treeselect.split(',')[0],
                     }
                     }).success(
                     function (response) {
                     if (response) {
                     $rootScope.groupdt = response;
                     window.top.frames["viewer2"].clearModels();
                     for (var i = 0; i < $rootScope.groupdt.length; i++) {
                     if ($rootScope.groupdt[i].isscanned)
                     window.top.frames["viewer2"].addOneFormwork($rootScope.groupdt[i].id);
                     }
                     }
                     else {
                     alert("weizhicuowu");
                     }
                     }).error(function () {
                     alert("ERROR！数据库连接错误或者打包已完成，无需再扫描");
                     });
                     });
                     }
                     }).error(function () {
                     alert("an unexpected error ocurred!");
                     });*/
                    $scope.change11($scope.project_id);

                }
            }
            $scope.compare = function (x) {
                $http.get($rootScope.ip + '/rlerp/Home/Formwork/getispackaged?', {
                    params: {
                        prj_id: x
                    }
                }).success(
                    function (res) {
                        if (res !== false) {
                        }
                        else {
                            alert("获取数据失败!");
                        }
                    }).error(function () {
                    alert("an unexpected error ocurred!");
                });

            }
            //清除iframe
            $scope.clearformwork = function () {
                window.top.frames["viewer2"].clearModels();
            }
            //记录所打印的标签
            $scope.printrecord = function (id) {
                $http.get($rootScope.ip + '/rlerp/Home/Formwork/printRecord?', {
                    params: {
                        formwork_id: id
                    }
                }).success(
                    function (res) {
                        if (res !== false) {
                        }
                        else {
                            alert("打印记录失败!");
                        }
                    }).error(function () {
                    alert("an unexpected error ocurred!");
                });

            };
            //焦点focus
            $scope.focus = function () {
                $('#scan').focus();
                $scope.scanner.ad = "";
                $scope.scanner.adrl = "";
            };
            $('.table-expandable').each(function () {
                var table = $(this);
                table.children('thead').children('tr').append('<th></th>');
                table.children('tbody').children('tr').filter(':odd').hide();
                table.children('tbody').children('tr').filter(':even').click(function () {
                    var element = $(this);
                    element.next('tr').toggle('slow');
                    element.find(".table-expandable-arrow").toggleClass("up");
                });
                table.children('tbody').children('tr').filter(':even').each(function () {
                    var element = $(this);
                    element.append('<td><div class="table-expandable-arrow"></div></td>');
                });
            });
            //导出Excel
            $scope.exportToExcel = function (x) {

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
                    filename: x + "清单" + time.getFullYear().toString() + '-' + month + date + '-' + hour + minute + second, // excel文件名
                    fileext: ".xls",//文件格式
                    exclude_img: false,//图片
                    exclude_links: true,//链接
                    exclude_inputs: true//输入
                });
            };

            //预选构件
            $scope.selectgj = function (x) {
                $http.get('/rlerp/Home/Partition?prj_id=' + $scope.project_id + '&component_no=' + x.toString()).success(
                    function (res) {
                        if (res) {
                            $scope.part = res;
                        }
                    }
                )
            }
//选择项目时 清除和加载tree、请求项目分区号、显示整个项目三维模型、
            $scope.change1111 = function (x) {

                $("#tree1").removeData("tree");
                //清空事件
                $("#tree1").unbind('click');
                $scope.groupdetail = null;
                $scope.part = null;
                $scope.pack = null;
                $scope.goujian = null;
                console.log(x);
                $scope.project_id = x;
                $rootScope.projectid = x;
                $("inputpckage").removeData();

                $scope.project_name = $scope.prj[x - 1].name;
                console.log("project" + $scope.project_name);

                $http.get($rootScope.ip + '/rlerp/Home/Partition?prj_id=' + x).success(
                    function (res) {
                        if (res) {
                            $scope.part = res.part;
                            $scope.formworksum = res.sum;
                            console.log($scope.part.length);
                            /*for(var i = 0; i<$scope.part.length; i++)
                             {
                             for(var j = 0; j<$scope.part[i].data.length; j++)
                             window.top.frames["viewer1"].addOneFormwork($scope.part[i].data[j].id);
                             }*/
                            $http.get($rootScope.ip + '/rlerp/Home/Partition/gj?prj_id=' + x).success(
                                function (res) {
                                    $scope.gjgj = res;
                                }
                            ).error(
                                function () {

                                });
                            $http.get($rootScope.ip + '/rlerp/Home/Formwork/getAllForTree?project_id=' + $scope.project_id).success(
                                function (res) {
                                    if (res) {
                                        var tree_data = res;
                                        var treeDataSource = new DataSourceTree({data: tree_data});
                                        console.log(treeDataSource);
                                        /*$('#tree1').ace_tree({
                                         dataSource: treeDataSource,
                                         multiSelect: false,
                                         loadingHTML: '<div class="tree-loading"><i class="icon-refresh icon-spin blue"></i></div>',
                                         'open-icon': 'icon-minus',
                                         'close-icon': 'icon-plus',
                                         'selectable': true,
                                         'selected-icon': 'icon-ok',
                                         'unselected-icon': 'icon-remove'
                                         })
                                         .on('selected', function (evt, data) {
                                         console.log(data);
                                         console.log(data.info[0].name1);
                                         $rootScope.groupdt = null;
                                         $scope.treeselect = data.info[0].name1;
                                         $http.get('/rlerp/Home/Formwork/grp?', {
                                         params: {
                                         gj: $scope.treeselect.split(',')[2],
                                         package_id: $scope.treeselect.split(',')[1],
                                         partition_id: $scope.treeselect.split(',')[0],
                                         }
                                         }).success(
                                         function (response) {
                                         if (response) {
                                         $rootScope.groupdt = response;
                                         window.top.frames["viewer2"].clearModels();
                                         //window.top.frames["viewer2"].loadModels($scope.projectid, $scope.treeselect.split(',')[0], $scope.treeselect.split(',')[1], $scope.treeselect.split(',')[2], $rootScope.groupdt[0].id);
                                         for (var i = 0; i < $rootScope.groupdt.length; i++) {
                                         if ($rootScope.groupdt[i].isscanned == '1')
                                         window.top.frames["viewer2"].addOneFormwork($rootScope.groupdt[i].id);
                                         }
                                         }
                                         else {
                                         alert("weizhicuowu");
                                         }
                                         }).error(function () {
                                         alert("ERROR！数据库连接错误或者打包已完成，无需再扫描");
                                         });
                                         });*/
                                    }
                                    else {
                                        alert("获取项目id失败");
                                    }
                                }).error(function () {
                                alert("an unexpected error ocurred1!");
                            });
                        }
                        else {
                            alert("获取分区信息失败");
                        }
                    }).error(function () {
                    alert("an unexpected error ocurred2!");
                });
            };
            $scope.change11 = function (x) {

                $("#tree1").removeData("tree");
                //清空事件
                $("#tree1").unbind('click');
                $scope.groupdetail = null;
                $scope.part = null;
                $scope.pack = null;
                $scope.goujian = null;
                console.log(x);
                $scope.project_id = x;
                $rootScope.projectid = x;
                $("inputpckage").removeData();

                $http.get($rootScope.ip + '/rlerp/Home/Partition/packinfo?prj_id=' + x).success(
                    function (res) {
                        if (res) {
                            $scope.part = res;


                            console.log($scope.part.length);

                            /*$http.get($rootScope.ip+'/rlerp/Home/Partition/gj?prj_id=' + x).success(
                             function (res) {
                             $scope.gjgj = res;
                             }
                             ).error(
                             function()
                             {

                             });*/
                            $http.get($rootScope.ip + '/rlerp/Home/Formwork/getAllForTree?project_id=' + $scope.project_id).success(
                                function (res) {
                                    if (res) {
                                        var tree_data = res;
                                        var treeDataSource = new DataSourceTree({data: tree_data});
                                        console.log(treeDataSource);
                                        $('#tree1').ace_tree({
                                            dataSource: treeDataSource,
                                            multiSelect: false,
                                            loadingHTML: '<div class="tree-loading"><i class="icon-refresh icon-spin blue"></i></div>',
                                            'open-icon': 'icon-minus',
                                            'close-icon': 'icon-plus',
                                            'selectable': true,
                                            'selected-icon': 'icon-ok',
                                            'unselected-icon': 'icon-remove'
                                        })
                                            .on('selected', function (evt, data) {
                                                console.log(data);
                                                console.log(data.info[0].name1);
                                                $rootScope.groupdt = null;
                                                $scope.treeselect = data.info[0].name1;
                                                $http.get('/rlerp/Home/Formwork/grp?', {
                                                    params: {
                                                        gj: $scope.treeselect.split(',')[3],
                                                        package_id: $scope.treeselect.split(',')[2],
                                                        partition_id: $scope.treeselect.split(',')[1],
                                                        prj_id: $scope.treeselect.split(',')[0]
                                                    }
                                                }).success(
                                                    function (response) {
                                                        if (response) {
                                                            $rootScope.groupdt = response;
                                                            window.top.frames["viewer2"].clearModels();
                                                            //window.top.frames["viewer2"].loadModels($scope.projectid, $scope.treeselect.split(',')[0], $scope.treeselect.split(',')[1], $scope.treeselect.split(',')[2], $rootScope.groupdt[0].id);
                                                            for (var i = 0; i < $rootScope.groupdt.length; i++) {
                                                                if ($rootScope.groupdt[i].isscanned == '1') {
                                                                    console.log($rootScope.groupdt[i].id);
                                                                    window.top.frames["viewer2"].addOneFormwork($rootScope.groupdt[i].id);
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            alert("weizhicuowu");
                                                        }
                                                    }).error(function () {
                                                    alert("ERROR！数据库连接错误或者打包已完成，无需再扫描");
                                                });
                                            });
                                    }
                                    else {
                                        alert("获取项目id失败");
                                    }
                                }).error(function () {
                                alert("an unexpected error ocurred1!");
                            });
                            for (var i = 0; i < $scope.part.length; i++) {
                                for (var j = 0; j < $scope.part[i].data.length; j++)
                                    if ($scope.part[i].data[j].ispackaged == '1') {
                                        console.log('xxxxx');
                                        window.top.frames["viewer3"].addOneFormwork($scope.part[i].data[j].id);
                                    }
                            }
                        }
                        else {
                            alert("获取分区信息失败");
                        }
                    }).error(function () {
                    alert("an unexpected error ocurred2!");
                });
            };
//选择分区时 请求分区包号、显示整个分区三维模型、
            $scope.change2222 = function (x) {
                $scope.pack = '';
                $scope.goujian = '';
                $scope.groupdetail = '';
                $scope.prtitionname = $scope.part[x - 1].name;
                console.log("partition" + $scope.prtitionname);
                if (x == null) {
                    window.top.frames["viewer1"].loadModels($scope.project_id);
                }
                else {
                    $scope.prtitionid = x;

                    $http.get('/rlerp/Home/Package?partition_id=' + x).success(
                        function (res) {
                            if (res) {
                                $scope.pack = res.package;
                                /*$scope.groupdetail=res.detail;*/
                            }
                            else {
                                alert("请先选择区域");
                            }
                        }).error(function () {
                        alert("an unexpected error ocurred!");
                    });
                    //window.top.frames["viewer1"].loadModels($scope.projectid, $scope.prtitionid);
                }
            };
//选择包号时 请求包号构件号、显示整个包三维模型、
            $scope.change3 = function (x) {
                $scope.goujian = '';
                $scope.groupdetail = '';
                $scope.package_name = $scope.pack.name;
                console.log("partition" + $scope.package_name);
                if (x == null) {
                    window.top.frames["viewer1"].loadModels($scope.project_id, $scope.prtitionid);
                }
                else {
                    $scope.pckageid = x;
                    console.log("package" + $scope.pckageid);

                    $http.get('/rlerp/Home/Formwork/groupInfo?', {
                        params: {
                            partition_id: $scope.prtitionid,
                            package_id: $scope.pckageid,
                        }
                    }).success(
                        function (res) {
                            if (res) {
                                $scope.goujian = res;
                            }
                            else {
                                alert("请先选择分包");
                            }
                        }).error(function () {
                        alert("an unexpected error ocurred!");
                    });
                    console.log($scope.project_id + ',' + $scope.prtitionid + ',' + $scope.pckageid);
                    //window.top.frames["viewer1"].loadModels($scope.project_id, $scope.prtitionid, $scope.pckageid);
                }
            };
//选择构件时 请求构件中所有模板、显示整个构件三维模型、统计该构件所有模板信息导出exce表
            $scope.change4 = function (x) {
                if (x == null) {
                    window.top.frames["viewer1"].loadModels($scope.project_id, $scope.prtitionid, $scope.pckageid);
                }
                else {
                    console.log("goujian" + x);
                    $scope.goujian_x = x;
                    //供显示使用
                    $http.get('/rlerp/Home/Formwork/grp?', {
                        params: {
                            prj_id: $scope.project_id,
                            gj: x,
                            package_id: $scope.pckageid,
                            partition_id: $scope.prtitionid,
                        }
                    }).success(
                        function (res) {
                            if (res) {
                                $scope.groupdetail = res;
                                window.top.frames["viewer1"].loadModels($scope.groupdetail[0].project_id, $scope.groupdetail[0].partition_id, $scope.groupdetail[0].package_id, $scope.groupdetail[0].component_no);
                            }
                            else {
                                alert("获取构件信息为空");
                            }
                        }).error(function () {
                        alert("an unexpected error ocurred!");
                    });

                    //统计供excel使用
                    $http.get('/rlerp/Home/Formwork/grpforexel?', {
                        params: {
                            gj: x,
                            package_id: $scope.pckageid,
                            partition_id: $scope.prtitionid,
                        }
                    }).success(
                        function (res) {
                            if (res) {
                                $scope.groupdetailforexel = res;
                                $scope.exelsum = 0;
                                for (var exellength = 0; exellength < $scope.groupdetailforexel.length; exellength++) {
                                    $scope.exelsumno = parseInt($scope.groupdetailforexel[exellength].id) + 1;
                                    $scope.exelsum = $scope.exelsum + parseInt($scope.groupdetailforexel[exellength].typecount);
                                }
                            }
                            else {
                                alert("获取构件信息为空");
                            }
                        }).error(function () {
                        alert("an unexpected error ocurred!");
                    });

                }

            };
        }
    )
;


productModule.factory('Excel', function ($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) {
            return $window.btoa(unescape(encodeURIComponent(s)));
        },
        format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
                return c[p];
            })
        };
    return {
        tableToExcel: function (tableId, worksheetName) {
            var table = $(tableId),
                ctx = {worksheet: worksheetName, table: table.html()},
                href = uri + base64(format(template, ctx));
            return href;
        }
    };
});

