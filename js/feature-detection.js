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
