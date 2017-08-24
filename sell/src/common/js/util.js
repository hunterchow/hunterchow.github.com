
export function urlParse () {
  var obj = {};
  var url = window.location.search;
  var reg = /[?&][^?&]+=[^?&]+/g;
  var arr = url.match(reg);    // arr = ['?id=123', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      var tempArr = item.substring(1).split('=');
      var key = decodeURIComponent(tempArr[0]);
      var value = decodeURIComponent(tempArr[1]);
      obj[key] = value;
    });
  }
  return obj;
}

