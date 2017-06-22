;(function(okay){

    window.Okay = okay || {};
    window.Okay.popUp = function(str,options){
        options = options || {};
        $("#pop-layer-box").remove();
        var elem = $("<div><div/>").prop({
                id: "pop-layer-box"
            }).css({
                "position"           : "fixed",
                "z-index"            : "9999",
                "background-color"   : options.backgroundColor || "rgba(0,0,0,0.5)",
                "color"              : "#fff",
                "font-size"          : options.fontSize || "0.56rem",
                "top"                : "50%",
                "left"               : "50%",
                "opacity"            : 0,
                "-webkit-transform"  : "translate3d(-50%,0,0)",
                "-moz-transform"     : "translate3d(-50%,0,0)",
                "-ms-transform"      : "translate3d(-50%,0,0)",
                "-o-transform"       : "translate3d(-50%,0,0)",
                "transform"          : "translate3d(-50%,0,0)",
                "-webkit-transition" : "200ms all ease",
                "-moz-transition"    : "200ms all ease",
                "-ms-transition"     : "200ms all ease",
                "-o-transition"      : "200ms all ease",
                "transition"         : "200ms all ease",
                "padding"            : "0.3rem 0.6rem",
                "border-radius"      : "4px"
            }).html(str).appendTo(document.body);

        setTimeout(function(){
            elem.css({
                "opacity"           : 1,
                "-webkit-transform" : "translate3d(-50%,-50%,0)",
                "-moz-transform"    : "translate3d(-50%,-50%,0)",
                "-ms-transform"     : "translate3d(-50%,-50%,0)",
                "-o-transform"      : "translate3d(-50%,-50%,0)",
                "transform"         : "translate3d(-50%,-50%,0)"
            })
        },50);

        setTimeout(function() {
            elem.css({
                "opacity"           : 0,
                "-webkit-transform" : "translate3d(-50%,0,0)",
                "-moz-transform"    : "translate3d(-50%,0,0)",
                "-ms-transform"     : "translate3d(-50%,0,0)",
                "-o-transform"      : "translate3d(-50%,0,0)",
                "transform"         : "translate3d(-50%,0,0)"
            });
            elem.one('transitionend webkitTransitionEnd oTransitionEnd',function () {
                elem.remove();
                options.callback && options.callback();
            });
        }, options.delay || 2000);

    }

})(window.Okay);
