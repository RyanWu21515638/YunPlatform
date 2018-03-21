/**
 *权限管控
 * @type {[type]}
 */
var authorModule = angular.module('AuthorModule', []);
authorModule.controller('AuthorCtrl', function ($scope, $rootScope, $http, $cookies, $state,$stateParams) {
    $scope.erp_group = $cookies.get('erp_group');
    $scope.jugeAuthor = function (int) {
        $state.go("index.YErp.authorerror");
        switch (int)
        {
            case 1:
                $scope.author_char = '系统管理';
                break;
            case 2:
                $scope.author_char = '生产流程管理';
                break;
            case 3:
                $scope.author_char = '仓储管理';
                break;
            case 4:
                $scope.author_char = '免预拼装';
                break;
            case 5:
                $scope.author_char = '设计管理';
                break;


        }

    }
});