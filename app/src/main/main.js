var home = angular.module('home', ['ngResource','ngCookies']);
home.controller('homeCtrl', function ($scope,$location, $anchorScroll) {


    $scope.p = function () {
        for (I=1; I<=475; I++){
            scroll(1,I)
        }
    }
    $scope.scrollup = function () {
        $location.hash('home');

        // 调用 $anchorScroll()
        $anchorScroll();
    }

})