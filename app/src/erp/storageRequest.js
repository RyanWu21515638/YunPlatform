storage.service('storageService', function ($resource, $http, $rootScope) {
    this.postCfg = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function (data) {
            return $.param(data);
        }
    };
    //卡板管理
    this.allkboard_get = function () {
        return $http.get($rootScope.ip+'/rlerp/home/Kboard/select_Kboard');
    };

    this.addkboard_post = function (data) {
        return $http.post($rootScope.ip+'/rlerp/home/Kboard/add_Kboard',data,this.postCfg);
    }
    this.delkboard_post = function (id) {
        var data = {};
        data.kboard_id = id;
        return $http.post($rootScope.ip+'/rlerp/home/Kboard/del_Kboard',data,this.postCfg);
    };
    //入库管理
    this.formworkbykbaord_get = function (kboard_id) {
        return $http.get($rootScope.ip+'/rlerp/home/Kboard/select_Kborad_FormworkAll?kboard_id='+kboard_id);
    }
    this.formworkin_post = function (data) {
        return $http.post($rootScope.ip+'/rlerp/home/Kboard/add_Kboard_storage',data,this.postCfg);
    }
    this.instoragelist_get = function () {
        return $http.get($rootScope.ip+'/rlerp/home/Kboard/select_UploadList');
    }
    this.instoragedetail_get = function (x) {
        return $http.get($rootScope.ip+'/rlerp/home/Kboard/select_ExcelList?up_id='+x);
    }
    this.instorageDel_post = function (id) {
        var data = {};
        data.up_id = id;
        return $http.post($rootScope.ip+'/rlerp/home/Kboard/del_Upload_Excel',data,this.postCfg);
    }
    this.storage_get = function () {
        return $http.get($rootScope.ip+'/rlerp/home/Kboard/OrderBy_creat_time');
    }
    this.select_StorageBf_DESC_get = function () {
        return $http.get($rootScope.ip+'/rlerp/home/Kboard/select_StorageBf_DESC');
    }
    //出库管理
    this.formworkout_post = function (id) {
        var data = {};
        data.formwork_id = id;
        return $http.post($rootScope.ip+'/rlerp/home/Kboard/del_Kboard_storage',data,this.postCfg);
    }
    this.temp_get = function () {
        return $http.get($rootScope.ip+'/rlerp/home/Kboard/select_New_Board_Storage');
    }
    this.add_outstorage_get = function () {
        return $http.get($rootScope.ip+'/rlerp/home/Kboard/add_Out_Storage');
    }
    this.select_Out_storage_get = function () {
        return $http.get($rootScope.ip+'/rlerp/home/Kboard/select_Out_storage');
    }
    this.select_out_storages_detail_get = function (id) {
        return $http.get($rootScope.ip+'/rlerp/home/Kboard/select_out_storages_detail?id='+id);
    }
    this.delete_out_storages_detail_post = function (id) {
        var data = {};
        data.id = id;
        return $http.post($rootScope.ip+'/rlerp/home/Kboard/del_out_storage_list',data,this.postCfg);
    }
    //移库
    this.remove_post = function (formwork_id,kboard_id) {
        var data ={};
        data.formwork_id = formwork_id;
        data.kboard_id = kboard_id;
        return $http.post($rootScope.ip+'/rlerp/home/Kboard/change_Kboard',data,this.postCfg);
    }
    this.select_Storages_TF_get = function () {
        return $http.get($rootScope.ip+'/rlerp/home/Kboard/select_Storages_TF');
    }
    //盘点
    this.pandian_get = function () {
        return $http.get($rootScope.ip+'/rlerp/home/Kboard/count_import_type');
    }

})