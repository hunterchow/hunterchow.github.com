/**
 * Created by Administrator on 2017/5/5.
 */
$(document).ready(function () {
  $(".masked").hover(
    function () {
      $(".masked>.mask").addClass("hover");
    },
    function () {
      $(".masked>.mask").removeClass("hover");
    }
  );




});
