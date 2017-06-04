/**
 * Created by Administrator on 2017/5/31.
 */
angular.module('baicizhan', ['ng', 'ngRoute', 'ngAnimate'])
  .controller('homeCtrl', function ($scope) {

  }).controller('loginCtrl', function ($scope) {

}).controller('classCtrl', function ($scope) {

}).controller('downloadCtrl', function ($scope) {

}).controller('joinCtrl', function ($scope,$interval) {
  $scope.banner = ["active", "", "", ""];
  for (var i = 0, temp; i < $scope.banner.length; i++) {
    var fun = (function (i) {
      return function () {
        // (i==4)&&(i=0);
        temp = $scope.banner[i];
        $scope.banner[i] = $scope.banner[i + 1];
        $scope.banner[i + 1] = temp;
      }
    })(i);
    $interval(fun,3000);
  }

  $scope.jobList1 = [
    {name: "超级Server服务器开发工程师", category: "技术类", location: "成都", time: "2017-05-25"},
    {name: "超级iOS开发工程师", category: "技术类", location: "成都", time: "2017-05-25"},
    {name: "超级Android开发工程师", category: "技术类", location: "成都", time: "2017-05-25"},
    {name: "超级UI设计师", category: "设计类", location: "成都", time: "2017-05-25"},
    {name: "设计师（平面/广告）", category: "设计类", location: "成都", time: "2017-05-25"},
    {name: "UI设计师", category: "设计类", location: "成都", time: "2017-05-25"},
    {name: "内容策划", category: "运营类", location: "成都", time: "2017-05-25"},
    {name: "百词斩管培", category: "职能类", location: "成都", time: "2017-05-25"},
    {name: "日语产品助理", category: "运营类", location: "成都", time: "2017-05-25"}
  ];
  $scope.jobList2 = [
    {name: "Web前端工程师(实习)", category: "技术类", location: "成都", time: "2017-05-25"},
    {name: "Web前端工程师(实习)", category: "技术类", location: "成都", time: "2017-05-25"},
    {name: "Web前端工程师(实习)", category: "技术类", location: "成都", time: "2017-05-25"},
    {name: "Web前端工程师(实习)", category: "技术类", location: "成都", time: "2017-05-25"},
    {name: "Web前端工程师(实习)", category: "技术类", location: "成都", time: "2017-05-25"},
    {name: "Web前端工程师(实习)", category: "技术类", location: "成都", time: "2017-05-25"}
  ];
  $scope.jobList = $scope.jobList1;
  $scope.fullTime = function () {
    $scope.jobList = $scope.jobList1;
  };
  $scope.practice = function () {
    $scope.jobList = $scope.jobList2;
  };
}).config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'tpl/home.html',
      controller: 'homeCtrl'
    }).when('/login', {
    templateUrl: 'tpl/login.html',
    controller: 'loginCtrl'
  }).when('/class', {
    templateUrl: 'tpl/class.html',
    controller: 'classCtrl'
  }).when('/download', {
    templateUrl: 'tpl/download.html',
    controller: 'downloadCtrl'
  }).when('/join', {
    templateUrl: 'tpl/join.html',
    controller: 'joinCtrl'
  }).otherwise({
    redirectTo: '/home'
  })
});

// var li=$(".carousel-indicators>li");
// for(var i=0;i<li.length;i++){
//   setTimeout(
//   (function (i) {
//     return function () {
//       li[i].toggleClass("active");
//     }
//   })(i),3000);
// }