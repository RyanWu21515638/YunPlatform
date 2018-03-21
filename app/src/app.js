var routerApp = angular.module('routerApp', ['ui.router', 'app', 'index', 'login', 'compare' , 'YPfMng' , 'home' ,'erp','storage','productModule','mechine'
,'UserModule','AuthorModule']);


/**
 *routerApp全局路由
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */
routerApp

//所有页面路由
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('index', {
                url: '/index',
                views: {
                    '': {
                        templateUrl: 'app/build/tpls/index/index.html'
                    },
                    'topbar@index': {
                        templateUrl: 'app/build/tpls/index/topbar.html'
                    },
                    'content@index': {
                        templateUrl: 'app/build/tpls/index/main.html'
                    }
                }
            })
            //模板对比
            .state('index.compare', {
                url: '/compare',
                views: {
                    'content@index': {
                        templateUrl: 'app/build/tpls/main/compare.html'
                    }
                }
            })
            .state('index.compare.oldlist', {
                url: '/oldlist',
                templateUrl: 'app/build/tpls/main/oldlist.html'
            })
            .state('index.compare.newlist', {
                url: '/newlist',
                templateUrl: 'app/build/tpls/main/newlist.html'
            })
            //订单
            .state('index.order', {
                url: '/order',
                views: {
                    '':{
                        templateUrl: 'app/build/tpls/main/allorder.html'
                    },
                    'content@index': {
                        templateUrl: 'app/build/tpls/main/orderinfo.html'
                    }
                }
            })
            .state('index.order.allorder', {
                url: '/allorder',
                templateUrl: 'app/build/tpls/main/allorder.html',
            })
            .state('index.order.orderdetail', {
                url: '/orderdetail',
                templateUrl: 'app/build/tpls/main/orderdetail.html',
            })
            //上传楼梯
            .state('index.P_formwork', {
                url: '/stairs',
                views: {
                    'content@index': {
                        templateUrl: 'app/build/tpls/main/YPM.html',
                    }
                }
            })
            .state('index.P_formwork.stairs', {
                url: '/stairs',
                templateUrl: 'app/build/tpls/main/stairsinfo.html'
            })
            .state('index.P_formwork.3d', {
                url: '/3d',
                templateUrl: 'app/build/tpls/main/3d_formwork.html'
            })
            .state('index.P_formwork.vr', {
                url: '/vr',
                templateUrl: 'app/build/tpls/main/vr.html'
            })
            .state('index.P_formwork.example',{
                url: '/example',
                templateUrl: 'app/build/tpls/main/stairsexample.html'
            })
            //登录注册
            .state('login', {
                url: '/login',
                templateUrl: 'app/build/tpls/login/login.html'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'app/build/tpls/login/register.html'
            })
            .state('rstpw', {
                url: '/rstpw',
                templateUrl: 'app/build/tpls/login/resetpassword.html'
            })
            .state('upgradeUser', {
                url: '/upgradeUser',
                templateUrl: 'app/build/tpls/login/upgradeUser.html'
            })
            //云erp
            .state('index.YErp', {
                url: '/YErp',
                views: {
                    'content@index': {
                        templateUrl: 'app/build/tpls/erp/erp.html'
                    }
                }
            })
            .state('index.YErp.userinfo', {
                url: '/userinfo',
                templateUrl: 'app/build/tpls/erp/userinfo.html'
            })
            .state('index.YErp.highchart', {
                url: '/highchart',
                templateUrl: 'app/build/tpls/erp/producehighchart.html'
            })
            .state('index.YErp.taskallocated', {
                url: '/taskallocated',
                templateUrl: 'app/build/tpls/erp/taskallocated.html'
            })
            .state('index.YErp.cut', {
                url: '/cut',
                templateUrl: 'app/build/tpls/erp/cutinfo.html'
            })
            .state('index.YErp.punchinginfo',{
                url: '/punchinginfo',
                templateUrl: 'app/build/tpls/erp/punchinginfo.html'
            })
            .state('index.YErp.jointinginfo',{
                url: '/jointinginfo',
                templateUrl: 'app/build/tpls/erp/jointinginfo.html'
            })
            .state('index.YErp.package',{
                url: '/package',
                templateUrl: 'app/build/tpls/erp/package.html'
            })
            .state('index.YErp.kboard', {
                url: '/kboard',
                templateUrl: 'app/build/tpls/erp/kboard.html'
            })
            .state('index.YErp.inout_storage', {
                url: '/inout_storage',
                templateUrl: 'app/build/tpls/erp/inout_storage.html'
            })
            .state('index.YErp.inventory', {
                url: '/inventory',
                templateUrl: 'app/build/tpls/erp/inventory.html'
            })
            .state('index.YErp.qualityinfo',{
                url: '/qualityinfo',
                templateUrl: 'app/build/tpls/erp/qualityinfo.html'
            })
            .state('index.YErp.packageinfo',{
                url: '/packageinfo',
                templateUrl: 'app/build/tpls/erp/packageinfo.html'
            })
            .state('index.YErp.erperror',{
                url: '/erperror',
                templateUrl: 'app/build/tpls/erp/erperror.html'
            })
            .state('index.YErp.mechinemng',{
                url: '/mechinemng',
                templateUrl: 'app/build/tpls/erp/mechinemng.html'
            })
            .state('index.YErp.authorerror',{
                url: '/authorerror',
                templateUrl: 'app/build/tpls/erp/authorerror.html'
            })
            .state('index.YErp.designmng',{
                url: '/designmng',
                templateUrl: 'app/build/tpls/erp/designmng.html'
            })
            //管理者平台
            .state('index.YPfMng', {
                url: '/YPfMng',
                views: {
                    'content@index': {
                        templateUrl: 'app/build/tpls/YPfMng/YPfMng.html'
                    }
                }
            })
            .state('index.YPfMng.allorder', {
                url: '/allorder',
                templateUrl: 'app/build/tpls/YPfMng/allorder.html',
            })
            .state('index.YPfMng.orderdetail', {
                url: '/orderdetail',
                templateUrl: 'app/build/tpls/YPfMng/orderdetail.html',
            })
    })
;
/**
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */

routerApp.run(function ($rootScope,$cookies) {
    //$rootScope.ip = 'http://192.168.3.158';
	//$rootScope.ip = 'http://192.168.1.173';
    $rootScope.ip = 'http://120.25.74.178';

    //获取电脑名称
    /*function getSysInfo(){
     try{var locator = new ActiveXObject ("WbemScripting.SWbemLocator");}
     catch (e){
     alert(e);
     }
     var service = locator.ConnectServer();
     //CPU信息
     var cpu = new Enumerator (service.ExecQuery("SELECT * FROM Win32_Processor")).item();
     var cpuType=cpu.Name,hostName=cpu.SystemName;
     //内存信息
     var memory = new Enumerator (service.ExecQuery("SELECT * FROM Win32_PhysicalMemory"));
     for (var mem=[],i=0;!memory.atEnd();memory.moveNext()) mem[i++]={cap:memory.item().Capacity/1024/1024,speed:memory.item().Speed}
     //系统信息
     var system=new Enumerator (service.ExecQuery("SELECT * FROM Win32_ComputerSystem")).item();
     var physicMenCap=Math.ceil(system.TotalPhysicalMemory/1024/1024),curUser=system.UserName,cpuCount=system.NumberOfProcessors
     return {cpuType:cpuType,cpuCount:cpuCount,hostName:hostName,curUser:curUser,memCap:physicMenCap,mem:mem}
     }
     $rootScope.computer_id_noencode =(getSysInfo().curUser.split("\\")[0]);
     $rootScope.computer_id =(encodeURI(getSysInfo().curUser.split("\\")[0]));*/
    //console.log($rootScope.computer_id);
    $rootScope.computer_id = "WIN-PRMNU2HQ1CD";
})
routerApp.controller('mainCtrl', function () {

})
;
