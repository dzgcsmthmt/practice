//判断是否支持webp
var hasWebP = false;
(function() {
  var img = new Image();
  img.onload = function() {
    hasWebP = !!(img.height > 0 && img.width > 0);
  };
  img.onerror = function() {
    hasWebP = false;
  };
  img.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA=';
})();
//判断是否支持某事件
var isEventSupported = (function(){
  var TAGNAMES = {
    'select':'input','change':'input',
    'submit':'form','reset':'form',
    'error':'img','load':'img','abort':'img'
  }
  function isEventSupported(eventName) {
    var el = document.createElement(TAGNAMES[eventName] || 'div');
    eventName = 'on' + eventName;
    var isSupported = (eventName in el);
    if (!isSupported) {
      el.setAttribute(eventName, 'return;');
      isSupported = typeof el[eventName] == 'function';
    }
    el = null;
    return isSupported;
  }
  return isEventSupported;
})();
