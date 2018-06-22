var util = {
    getUrlParam: function(name, url) {
        if (!name) {
            return null;
        }
        url = url || location.search;
        name = name.replace(/(?=[\\^$*+?.():|{}])/, '\\');
        var reg = new RegExp('(?:[?&]|^)' + name + '=([^?&#]*)', 'i');
        var match = url.match(reg);
        return !match ? null : match[1];
    },
    tplEngine: function(tpl, data) {
       var match,reg = /<%(.+)?%>/g,
           regOut = /(^(\s)+(if|for|else|switch|case|break|{|}))(.*)?/g,
           code = 'var r=[];\n',
           cursor = 0;

       var add = function(line, js) {
           if(js){
               code += line.match(regOut) ? line + '\n' : 'r.push(' + line + ');\n';
           }else{
               code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '';
           }
           return add;
       }
       while(match = reg.exec(tpl)) {
           add(tpl.slice(cursor, match.index))(match[1], true);
           cursor = match.index + match[0].length;
       }
       add(tpl.substr(cursor, tpl.length - cursor));
       code += 'return r.join("");';
       return new Function(code.replace(/[\r\t\n]|\s{6,}/g, '')).apply(data);
   },
   deepClone: function(obj, hash = new WeakMap()){
       var result;
       if (Object(obj) !== obj) return obj; // primitives
       if (hash.has(obj)) return hash.get(obj); // cyclic reference
       [ Number, String, Boolean ].forEach(function(type) {
           if (obj instanceof type) {
               return type( obj );
           }
       });
       if (Object.prototype.toString.call( obj ) === "[object Array]") {
            result = [];
            obj.forEach(function(child, index, array) {
                result[index] = clone( child );
            });
        } else{
            // testing that this is DOM
            if (obj.nodeType && typeof obj.cloneNode == "function") {
                result = obj.cloneNode( true );
            } else if (obj instanceof Date) {
                result = new Date(obj);
            } else if (obj instanceof RegExp) {
                result = new RegExp(obj.source, obj.flags);
            } else if(obj.constructor){
                new obj.constructor();
            }else if(
                result = {};
                for (var i in obj) {
                    result[i] = this.deepClone(obj[i]);
                }
            )
        }
        return result;
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
   supportsTransitions: function() {
       var s = document.createElement('p').style,
           v = ['ms','O','Moz','Webkit'];
       if( s['transition'] == '' ) return true;
       while( v.length ){
           if( v.pop() + 'Transition' in s ){
               return true;
           }
       }
       return false;
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

        return fmt;
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
