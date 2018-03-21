var storage = angular.module('storage', ['ngResource', 'ngCookies']);
storage.controller('storageCtrl', function ($rootScope, $scope, $timeout, $interval, $state, $cookies, $http, storageService) {

    $scope.kboardinfo = {};
    $scope.lockbl = false;
    $scope.signature = $cookies.get('signature');
    $scope.setlinkinstorage = function () {
        document.getElementById('import').action = $rootScope.ip+"/rlerp/home/Kboard/impExcel";
    }
    $scope.setlinkoutstorage =function () {
        document.getElementById('import2').action = $rootScope.ip+"/rlerp/home/Kboard/impExcel_new";
    }

    selectkboard = function () {
        storageService.allkboard_get().then(
            function (res) {
                $scope.kboard = res.data;
            }
        )
    }
    selectinstoragelist = function () {
        storageService.instoragelist_get().then(
            function (res) {
                $scope.instoragelist = res.data;
            }
        )
    }
    pandian = function () {
        storageService.pandian_get().then(
            function (res) {
                $scope.pandianinfo = res.data;
            }
        )
    }
    storage_desc = function () {
        storageService.storage_get().then(
            function (res) {
                $scope.storage = res.data;
            }
        )
    }
    select_StorageBf_DESC = function () {
        storageService.select_StorageBf_DESC_get().then(
            function (res) {
                $scope.storageout = res.data;
            }
        )
    }
    select_Storages_TF = function () {
        storageService.select_Storages_TF_get().then(
            function (res) {
                $scope.storageremove = res.data;
            }
        )
    }
    select_temp = function () {
        storageService.temp_get().then(
            function (res) {
                $scope.temp = res.data;
            }
        )
    }
    select_Out_storage = function () {
        storageService.select_Out_storage_get().then(
            function (res) {
                $scope.oustoragelist = res.data;
            }
        )
    }
    findkboardname = function (id) {
        for (var i = 0; i < $scope.kboard.length; i++)
            if ($scope.kboard[i].id == id) {
                $scope.kboardname = $scope.kboard[i].name;
            }
    }
    selectkboard();
    selectinstoragelist();
    pandian();
    storage_desc();
    select_StorageBf_DESC();
    select_temp();
    select_Out_storage();
    select_Storages_TF();
    $scope.addkboard = function () {
        $scope.kboardinfo.signature = $cookies.get('signature');
        storageService.addkboard_post($scope.kboardinfo).then(
            function (res) {
                selectkboard();
            }
        )
    }
    $scope.kboarddel = function (id) {
        storageService.delkboard_post(id).then(
            function (res) {
                selectkboard();
            }
        )
    }
    //导入入库单
    $scope.instorageDetail = function (id) {
        storageService.instoragedetail_get(id).then(
            function (res) {
                $scope.instorageDetailinfo = res.data;
            }
        )
    }
    $scope.instorageDel = function (id) {
        storageService.instorageDel_post(id).then(
            function (res) {
                selectinstoragelist();
            }
        )
    }
    //入库扫卡板
    $scope.setnull = function () {
        $scope.kboardinfo.kboardstr = '';
    }
    $scope.enable = function () {
        document.getElementById('kboardin').disabled = "";
        $scope.lockbl = false;
    }
    $scope.kboardscan = function (e) {
        if (e.keyCode == 13) {
            var toDo = function () {
                document.getElementById('kboardin').disabled = "disabled";
                $scope.lockbl = true;
                findkboardname($scope.kboardinfo.kboardstr);
                storageService.formworkbykbaord_get($scope.kboardinfo.kboardstr).then(
                    function (res) {
                        $scope.kboard_formwork = res.data;
                    }
                )
            };
            $timeout(toDo, 1500);
        }
    }
    //入库扫模板
    $scope.formworkinscan = function (e) {
        if (e.keyCode == 13) {
            var toDo = function () {
                //参数：kboard_id，formwork_id，project_id，partition_id，package_id
                $scope.kboardinfo.kboard_id = parseInt($scope.kboardinfo.kboardstr);
                $scope.kboardinfo.formwork_id = $scope.kboardinfo.inputformwork.split('-')[0];
                $scope.kboardinfo.project_id = 1;
                $scope.kboardinfo.partition_id = 1;
                $scope.kboardinfo.package_id = 1;
                $scope.kboardinfo.type = $scope.kboardinfo.inputformwork.split('-')[1];
                console.log($scope.kboardinfo.inputformwork);
                storageService.formworkin_post($scope.kboardinfo).then(
                    function (res) {
                        storageService.formworkbykbaord_get($scope.kboardinfo.kboardstr).then(
                            function (res2) {
                                $scope.kboard_formwork = res2.data;
								$scope.kboardinfo.inputformwork = '';
                            }
                        );
                        storage_desc();
                    }
                )
            };
            $timeout(toDo, 1500);
        }
    }
    //出库扫模板
    $scope.formworkoutscan = function (e) {
        if (e.keyCode == 13) {
            var toDo = function () {
                storageService.formworkout_post($scope.kboardinfo.outputformwork.split('-')[0]).then(
                    function (res) {
                        storageService.formworkbykbaord_get(res.data.kboard_id).then(
                            function (res2) {
                                findkboardname(res.data.kboard_id);
                                select_StorageBf_DESC();
                                $scope.kboard_formwork = res2.data;
								$scope.kboardinfo.outputformwork = '';
                            }
                        );
                    }
                )
            };
            $timeout(toDo, 1500);
        }
    }

    $scope.print = function (x) {
        $('#qrcode').html('');
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            width: 130,
            height: 130,
            colorDark: "#000000",
            colorLight: "#ffffff",
        });
        qrcode.makeCode(x);
        $scope.timerls = $timeout(function () {
            LODOP = getLodop();
            LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
            /*LODOP.SET_PRINT_STYLE("FontSize", 14);
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
            LODOP.ADD_PRINT_TEXT(85, 80, 2000, 200, x);


            LODOP.SET_PRINT_STYLE("FontSize", 14);
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
            LODOP.SET_PRINT_STYLE("FontSize", 14);
            LODOP.SET_PRINT_STYLE("Bold", 1);
            LODOP.ADD_PRINT_TEXT(25, 105, 2000, 200, '卡板号:'+x);
            LODOP.ADD_PRINT_HTM(55, 85, 2000, 2000, document.getElementById("qrcode").innerHTML);
            LODOP.PREVIEW();
        }, 500);

    }
    $scope.kboardselect = function (id) {
        console.log(id);
        storageService.formworkbykbaord_get(id.id).then(
            function (res) {
                $scope.kboard_formwork = res.data;
            }
        )
    }
    $scope.addoutstorage_list = function () {
        storageService.add_outstorage_get().then(
            function (res) {
                select_Out_storage();
                $scope.outstorage_detail(res.data);
                document.getElementById('outstorage1').style.display = 'none';
                document.getElementById('outstorage2').style.display = 'block';
            }
        )
    }
    $scope.outstorage_detail = function (id) {
        storageService.select_out_storages_detail_get(id).then(
            function (res) {
                $scope.ourstoragedetail = res.data;
                document.getElementById('outstorage1').style.display = 'none';
                document.getElementById('outstorage2').style.display = 'block';
            }
        )
    }

    $scope.delete_out_storages_detail = function (id) {
        storageService.delete_out_storages_detail_post(id).then(
            function (res) {
                select_Out_storage();
            }
        )
    }
    $scope.back = function () {
        select_temp();
        document.getElementById('outstorage1').style.display = 'block';
        document.getElementById('outstorage2').style.display = 'none';
    }
    //移库
    $scope.formworkremovescan =function (e) {
        if (e.keyCode == 13) {
            var toDo = function () {
                storageService.remove_post($scope.kboardinfo.removeformwork.split('-')[0],$scope.kboardinfo.kboardstr).then(
                    function (res) {
                        select_Storages_TF();
						$scope.kboardinfo.removeformwork = '';
                    }
                )
            };
            $timeout(toDo, 1500);
        }
    }
})