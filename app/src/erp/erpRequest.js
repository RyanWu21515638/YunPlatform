erp.service('erpService', function ($resource, $http, $rootScope,$cookies) {
    this.postCfg = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function (data) {
            return $.param(data);
        }
    };
    this.cut = function (x,y,z) {
        return $http.get($rootScope.ip+'/rlerp/home/storage/select_formworklist?prid=' + x + '&mach_id=' + y +'&process_id=' +z);
    };
    this.allformwork = function (x,y,z) {
        return $http.get($rootScope.ip+'/rlerp/home/storage/incision?prid=' + x + '&currentPage=' +y+'&itemsPerPage='+z);
    };
    this.allformwork_sum = function (x) {
        return $http.get($rootScope.ip+'/rlerp/home/storage/incision_sum?prid=' + x);
    };
    this.allformwork2 = function (x,y,z1,z2) {
        var data = {};
        data.prid = x;
        data.currentPage = z1;
        data.type = y;
        data.itemsPerPage = z2;
        //var url = encodeURI($rootScope.ip+'/rlerp/index.php/home/storage/select_CountFormworklist?prid=' + x + '&type=' + y);
        return $http.post($rootScope.ip+'/rlerp/home/storage/select_CountFormworklist',data,this.postCfg);
    }
    this.select_fuzzy_interface = function (x,y,z) {
        var data = {};
        data.prid = x;
        data.type = y;
        data.fuzzy_var = z;
        return $http.post($rootScope.ip+'/rlerp/home/storage/select_fuzzy' ,data,this.postCfg);
    }
    this.punching = function (x,y,z) {
        return $http.get($rootScope.ip+'/rlerp/home/storage/select_formworklist?prid=' + x + '&mach_id=' + y +'&process_id=' +z);
    };
    this.jointing = function (x,y,z) {
        return $http.get($rootScope.ip+'/rlerp/home/storage/select_formworklist?prid=' + x + '&mach_id=' + y +'&process_id=' +z);
    };
    this.feeding = function (x,y,z) {
        return $http.get($rootScope.ip+'/rlerp/home/storage/select_formworklist?prid=' + x + '&mach_id=' + y +'&process_id=' +z);
    };

    this.getproject = function () {
        //return $http.get($rootScope.ip+'/rlerp/Home/Project?company_id='+$cookies.get('signature'));
        return $http.get($rootScope.ip+'/rlerp/Home/Project?company_id='+1);
    };
    this.getProjectNew = function () {
        return $http.get($rootScope.ip + '/rlerp/Home/project/projectNew?company_id='+$cookies.get('signature'));
    }
    this.changePrjStatus = function (prjId) {
        var data = {};
        data.prj_id = prjId;
        return $http.post($rootScope.ip + '/rlerp/home/Project/saveStatus', data, this.postCfg);
    }
    this.getsingleformwork = function (x) {
        return $http.get($rootScope.ip+'/rlerp/home/storage/getFormwork?id=' + x);
    };
    this.showeveryday = function (x) {
        return $http.get($rootScope.ip+'/rlerp/home/storage/getStatistics?start_time=2016-11-01&end_time=2016-11-30&prid=' + x);
    };
    this.showchart = function (x, stt, endt) {
        return $http.get($rootScope.ip+'/rlerp/home/storage/getStatistics?start_time=' + stt + '&end_time=' + endt + '&prid=' + x);
    }
    this.cutrecordinfo = function () {
        return $http.post($rootScope.ip+'/rlerp/home/storage/postUpdate_Incise', 766, this.postCfg);
    }
    ;
    //任务查增删
    this.taskselect = function (x) {
        return $http.get($rootScope.ip+'/rlerp/home/storage/select_TaskList?prid=' + x);
    };
    this.taskadd = function (x) {
        return $http.post($rootScope.ip+'/rlerp/home/storage/postAssign_task',x,this.postCfg);
    };
    this.taskdelete = function (x) {
        return $http.post($rootScope.ip+'/rlerp/home/storage/delete_TaskList',x,this.postCfg);
    };

    //机台查增删
    this.mechineselect = function () {
        return $http.get($rootScope.ip+'/rlerp/home/storage/select_Machine');
    };
    this.mechineadd = function (x) {
        return $http.post($rootScope.ip+'/rlerp/home/storage/add_machine',x, this.postCfg);
    };
    this.mechinedelete = function (x) {
        return $http.post($rootScope.ip+'/rlerp/home/storage/delete_machine', x,this.postCfg);
    };

    //查工序
    this.processselect = function () {
        return $http.get($rootScope.ip+'/rlerp/home/storage/get_Process');
    };
    //查工人 group为4
    this.labourselect = function () {
        return $http.get($rootScope.ip+'/rlerp/home/User/select_userid');
    }
    //按工序查机台
    this.mechineselectbygx = function (x) {
        return $http.post($rootScope.ip+'/rlerp/home/User/select_machinelist',x,this.postCfg);

    }
    //统计进度a
    this.static = function (x) {
        return $http.get($rootScope.ip+'/rlerp/home/storage/Count_Component_type?prid=' + x);
    }
    //查询项目所有模板类别 墙梁板，吊板K板，楼梯等等

    this.component_types_select = function (x) {
        return $http.get($rootScope.ip+'/rlerp/home/storage/OrderBy_componet_type?prid=' + x);
    }
    //查任务单
    this.task_select_for_print = function (x) {
        return $http.get($rootScope.ip+'/rlerp/home/storage/select_userTasklist?task_id=' + x);
    }
    //删除项目
    this.project_delete = function (x) {
        return $http.get($rootScope.ip+'/rlerp/Home/Project/deleteproject?prj_id=' + x);
    }

})