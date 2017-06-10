/**
 * Created by Administrator on 2017/5/31.
 */
angular.module('baicizhan', ['ng', 'ngRoute', 'ngAnimate','ui.bootstrap'])
  .controller('homeCtrl', function ($scope) {

  }).controller('wordTVCtrl', function ($scope) {
  $scope.book = [
    {face: '9_book_face', difficulty: 2},
    {face: '12_book_face', difficulty: 2},
    {face: '2_book_face', difficulty: 2},
    {face: '3_book_face', difficulty: 2},
    {face: '7_book_face', difficulty: 3},
    {face: '11_book_face', difficulty: 3},
    {face: '10_book_face', difficulty: 3},
    {face: '1_book_face', difficulty: 4},
    {face: '8_book_face', difficulty: 4},
    {face: '6_book_face', difficulty: 5},
    {face: '5_book_face', difficulty: 5},
    {face: '4_book_face', difficulty: 5}
  ];

  $scope.newAdvice = [
    {
      face: "bcztv_20151106170614_封面11.png",
      infoH4:"狂欢“双十一”之买买买",
      infoP:"与买买买有关的十个单词",
      star:2*22+'px'
    },
    {
      face: "bcztv_20150926142733_cover－易混词.jpg",
      infoH4:"易混词合集VOL.1",
      infoP:"一次讲清易混点",
      star:1*22+'px'
    },
    {
      face: "bcztv_20150811181323_豌_.png",
      infoH4:"重口小讲堂",
      infoP:"传播重口画面是我们的职责！",
      star:5*22+'px'
    },
    {
      face: "bcztv_20150912151023_embarrassed.png",
      infoH4:"羞羞的知识",
      infoP:"未满18请撤离！",
      star:5*22+'px'
    },
    {
      face: "bcztv_20150916170445_看mv学单词.jpg",
      infoH4:"看MV学单词VOL.1",
      infoP:"跟着MV来刷词！",
      star:4*22+'px'
    },
    {
      face: "bcztv_20150907105543_toefl-cover.png",
      infoH4:"托福单词课",
      infoP:"斩家老师帮你全面掌握托福考点！",
      star:5*22+'px'
    }
  ];
  $scope.hotAdvice = [
    {
      face: "bcztv_20150829181744_cover－virgo.png",
      infoH4:"迷之处女座",
      infoP:"还原一个真实的处女座~",
      star:2*22+'px'
    },
    {
      face: "bcztv_20150829181607_开学季.png",
      infoH4:"开学啦",
      infoP:"那些课堂上发生的趣事~",
      star:2*22+'px'
    },
    {
      face: "bcztv_20150916170445_看mv学单词.jpg",
      infoH4:"看MV学单词VOL.1",
      infoP:"跟着MV来刷词！",
      star:4*22+'px'
    },
    {
      face: "bcztv_20150925160849_cover－一起过中秋.png",
      infoH4:"一起过中秋",
      infoP:"那些与中秋有关的单词",
      star:2*22+'px'
    },
    {
      face: "bcztv_20150926142733_cover－易混词.jpg",
      infoH4:"易混词合集VOL.1",
      infoP:"一次讲清易混点",
      star:1*22+'px'
    },
    {
      face: "bcztv_20150812105351_mangahero2.png",
      infoH4:"上吧！！英雄联盟！",
      infoP:"看看英雄都有哪些技能",
      star:1*22+'px'
    }
  ];
  $scope.newsBox=[
    {content:"黄段子怎么说？"},
    {content:"挖掘机也能玩儿漂移！"},
    {content:"Adele回归！来回味下曾经的经典！"},
    {content:"“黑历史”最早来源于哪儿？"},
    {content:"如果超人来自印度……"},
    {content:"贝爷如何在沙漠中Recycle水资源？"},
    {content:"紧张的时候怎么办？（未成年不要学）"}
  ]
}).controller('loginCtrl', function ($scope) {

}).controller('classCtrl', function ($scope) {
  $scope.section = [
    {
      imgSrc: "img/class/2c57f8343d54.png",
      h5: "我们为什么必须背单词？",
      p: "你看，连美国小孩儿都要背单词呢。",
      likeCount: 6574,
      eyeCount: 32545
    },
    {
      imgSrc: "img/class/b85f2aa239fe.jpg",
      h5: "如何在一天内记200个单词？",
      p: "有人的地方就有江湖，而有江湖的地方，从来不缺学霸的传说。",
      likeCount: 3804,
      eyeCount: 62521
    },
    {
      imgSrc: "img/class/cf777a20d5c4.jpg",
      h5: "单词拼写，怎么记又快又好？",
      p: "除了死记硬背，我们还有很多选择。",
      likeCount: 3275,
      eyeCount: 34104
    },
    {
      imgSrc: "img/class/77169a2225ce.jpg",
      h5: "坏习惯一大堆？别怕，还有救",
      p: "纵然你有很多坏习惯，也千万不要放弃治疗哦。",
      likeCount: 37389,
      eyeCount: 65621
    },
    {
      imgSrc: "img/class/8cf01397b807.jpg",
      h5: "百词斩2017校园招聘，开车咯！",
      p: "",
      likeCount: 2068,
      eyeCount: 48720
    }
  ];
}).controller('downloadCtrl', function ($scope) {
  $scope.myInterval=3000;
  $scope.noWrapSlides=false;
  $scope.active=0;
  var slides=$scope.slides=[];
  var addSlide=function(){
    slides.push({
      image:"img/download/download-01.png",
      id:0
    });
    slides.push({
      image:"img/download/download-02.png",
      id:1
    });
    slides.push({
      image:"img/download/download-03.png",
      id:2
    });
    slides.push({
      image:"img/download/download-04.png",
      id:3
    });
    slides.push({
      image:"img/download/download-05.png",
      id:4
    });
    slides.push({
      image:"img/download/download-06.png",
      id:5
    });
  };
  addSlide();

}).controller('joinCtrl', function ($scope) {

  $scope.myInterval=5000;
  $scope.noWrapSlides=false;
  $scope.active=0;
  var slides=$scope.slides=[];
  var addSlide=function(){
    slides.push({
      image:"img/join/jobs-01.jpg",
      id:0
    });
    slides.push({
      image:"img/join/jobs-02.jpg",
      id:1
    });
    slides.push({
      image:"img/join/jobs-03.jpg",
      id:2
    });
    slides.push({
      image:"img/join/jobs-04.jpg",
      id:3
    });
  };
  addSlide();

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
