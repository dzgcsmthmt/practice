;(function(){
    var util = {
        URL: 'http://mall.xk12.cn',
        //  URL: 'http://pay.xk12.cn',
        // URL: 'http://mall.okay.cn',
        // URL: 'http://mall.zl.cn',
        // URL: 'http://172.16.22.104:8081',
        isMobile:function(){
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        },
        isAndroid: function(){
            return /Android/i.test(navigator.userAgent);
        },
        isIOS: function(){
            return /iPad|iPhone|iPod/i.test(navigator.userAgent) && !window.MSStream
        },
        isPhone: function(val){
            return /^1\d{10}$/.test(val);
        },
        isPwd: function(val){
            return /^[1-9a-zA-Z]{6,20}$/.test(val);
        },
        isMsgCode: function(val){
            return /^\d{4}$/.test(val);
        },
        isEmail: function(val){
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val);
        },
        isName: function(val){
            return /^[\u4E00-\u9FFF]{1,10}$/.test(val);
        },
        searchUrl: function(str){
            var obj = {};
            var str = str.substring(1);
            var arr = str.split('&');
            for (var i = 0,len = arr.length; i < len; i++) {
                var item = arr[i];
                var pair = item.split('=');
                if(obj[pair[0]]){
                    if(Array.isArray(obj[pair[0]])){
                        obj[pair[0]].push(pair[1]);
                    }else{
                        obj[pair[0]] = [obj[pair[0]],pair[1]];
                    }
                }else{
                    obj[pair[0]] = pair[1];
                }
            }
            return obj;
        },
        splitUrl: function(str){
            return str.replace(/[&\?]returnURL=.*&/g,'&').replace(/[&\?]returnURL=.*$/,'');
        },
        isInteger: function(num){
            return (num^0) === num;
        },
        findWhere: function(array,prop){
            for (var i = 0,len = array.length; i < len; i++) {
                for (var key in prop) {
                    if (prop.hasOwnProperty(key)) {
                        if(array[i][key] == prop[key]){
                            return i;
                        }
                    }
                }
            }
            return null;
        },
        filter: function(array,prop){
            for (var i = 0,len = array.length; i < len; i++) {
                for (var key in prop) {
                    if (prop.hasOwnProperty(key)) {
                        if(array[i][key] == prop[key]){
                            return array[i];
                        }
                    }
                }
            }
            return null;
        },
        pluck: function(list,attr){
            var arr = [];
            for(var i = 0,len = list.length;i < len;i++){
                arr.push(list[i][attr]);
            }
            return arr;
        },
        extendDefaults: function(source, properties) {
            var property;
            for (property in properties) {
              if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
              }
            }
            return source;
        },
        debounce: function (func, wait, immediate) {
        	var timeout;
        	return function() {
        		var context = this, args = arguments;
        		var later = function() {
        			timeout = null;
        			if (!immediate) func.apply(context, args);
        		};
        		var callNow = immediate && !timeout;
        		clearTimeout(timeout);
        		timeout = setTimeout(later, wait);
        		if (callNow) func.apply(context, args);
        	};
        },
        format: function(date,fmt){
            var o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'S':  date.getMilliseconds()
            }

            if(/(y+)/.test(fmt)){
               fmt = fmt.replace(RegExp.$1,('' + date.getFullYear()).substr(4 - RegExp.$1.length));
            }

            for(var k in o){
                if(new RegExp("(" + k + ")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] : String(o[k]).length == 1 ? "0" + o[k] : o[k]);
                }
            }

            return fmt
        },
        setCookie: function(cname, cvalue, exhours) {
            var d = new Date();
            d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
        getCookie: function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        delCookie: function(cname) {
            this.setCookie(cname,"",-1);
        }
    }
    window.Okay = window.Okay || {};
    window.Okay.util = util;
})(window.Okay);
