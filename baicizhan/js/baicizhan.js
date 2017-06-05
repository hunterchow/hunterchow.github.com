/**
 * Created by Administrator on 2017/5/31.
 */
angular.module('baicizhan', ['ng', 'ngRoute', 'ngAnimate'])
  .controller('homeCtrl', function ($scope) {

  }).controller('wordTVCtrl', function ($scope) {

}).controller('loginCtrl', function ($scope) {

}).controller('classCtrl', function ($scope) {
  $scope.section=[
    {
      imgSrc:"img/class/2c57f8343d54.png",
      h5:"我们为什么必须背单词？",
      p:"你看，连美国小孩儿都要背单词呢。",
      likeCount:6574,
      eyeCount:32545
    },
    {
      imgSrc:"img/class/b85f2aa239fe.jpg",
      h5:"如何在一天内记200个单词？",
      p:"有人的地方就有江湖，而有江湖的地方，从来不缺学霸的传说。",
      likeCount:3804,
      eyeCount:62521
    },
    {
      imgSrc:"img/class/cf777a20d5c4.jpg",
      h5:"单词拼写，怎么记又快又好？",
      p:"除了死记硬背，我们还有很多选择。",
      likeCount:3275,
      eyeCount:34104
    },
    {
      imgSrc:"img/class/77169a2225ce.jpg",
      h5:"坏习惯一大堆？别怕，还有救",
      p:"纵然你有很多坏习惯，也千万不要放弃治疗哦。",
      likeCount:37389,
      eyeCount:65621
    },
    {
      imgSrc:"img/class/8cf01397b807.jpg",
      h5:"百词斩2017校园招聘，开车咯！",
      p:"",
      likeCount:2068,
      eyeCount:48720
    }
  ];
}).controller('downloadCtrl', function ($scope) {

}).controller('joinCtrl', function ($scope, $interval) {
  // $scope.banner = ["active", "", "", ""];
  // for (var i = 0, temp; i < $scope.banner.length; i++) {
  //   var fun = (function (i) {
  //     return function () {
  //       // (i==4)&&(i=0);
  //       temp = $scope.banner[i];
  //       $scope.banner[i] = $scope.banner[i + 1];
  //       $scope.banner[i + 1] = temp;
  //     }
  //   })(i);
  //   $interval(fun, 3000);
  // }

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
    }).when('/wordTV', {
    templateUrl: 'tpl/wordTV.html',
    controller: 'wordTVCtrl'
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
