app.service('mainService', function ($resource, $http, $rootScope) {
    this.postCfg = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function (data) {
            return $.param(data);
        }
    };
    //提交订单
    this.submit_order_post = function (order_info) {
        return $http.post($rootScope.ip + '/designPlatform/home/user/add_order', order_info, this.postCfg);
    }
    this.execAUTOCAD_post = function (order_no,order_type) {
        var data = {};
        data.order_no = order_no;
        data.order_type = order_type;
        return $http.post($rootScope.ip + '/designPlatform/home/user/execCADAUTO', data, this.postCfg);
    }
    //获取订单
    this.orderlist_get = function (user_id) {
        return $http.get($rootScope.ip + '/designPlatform/home/user/Orderlist?user_id=' + user_id);
    }
    //获取所有订单
    this.allorder_get = function () {
        return $http.get($rootScope.ip + '/designPlatform/home/user/Select_OrderList');
    }
    //修改付款状态
    this.paystatus_post = function (sn) {
        var data={};
        data.sn=sn;
        return $http.post($rootScope.ip + '/designPlatform/home/user/Update_Pay_Status',data,this.postCfg);
    }

    //删除订单
    this.delete_order_post = function (sn) {
        var data = {};
        data.sn = sn;
        return $http.post($rootScope.ip + '/designPlatform/home/user/Delete_Order', data, this.postCfg);
    }
    //获取仓库列表
    this.formwork_storage_get = function (user_id) {
        return $http.get($rootScope.ip + '/designPlatform/home/excel/select_old_excel?user_id=' + user_id);
    }
    //获取对比列表
    this.formwork_compare_get = function (user_id) {
        return $http.get($rootScope.ip + '/designPlatform/home/excel/select_new_excel?user_id=' + user_id);
    }
    //清空库存
    this.storage_clear_post = function (user_info) {
        return $http.post($rootScope.ip + '/designPlatform/home/excel/delete_impExcel', user_info, this.postCfg);
    }
})