var util = {
    getUrlParam: function (name, url) {
        if (!name) {
            return null;
        }
        url = url || location.search;
        name = name.replace(/(?=[\\^$*+?.():|{}])/, '\\');
        var reg = new RegExp('(?:[?&]|^)' + name + '=([^?&#]*)', 'i');
        var match = url.match(reg);
        return !match ? null : match[1];
    },
    jsonToQueryString: function (json) {
        return Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
        }).join('&');
    },
    tplEngine: function (tpl, data) {
        var match, reg = /<%(.+)?%>/g,
            regOut = /(^(\s)+(if|for|else|switch|case|break|{|}))(.*)?/g,
            code = 'var r=[];\n',
            cursor = 0;

        var add = function (line, js) {
            if (js) {
                code += line.match(regOut) ? line + '\n' : 'r.push(' + line + ');\n';
            } else {
                code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '';
            }
            return add;
        }
        while (match = reg.exec(tpl)) {
            add(tpl.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        add(tpl.substr(cursor, tpl.length - cursor));
        code += 'return r.join("");';
        return new Function(code.replace(/[\r\t\n]|\s{6,}/g, '')).apply(data);
    },
    deepClone: function (obj, hash = new WeakMap()) {
        var result;
        if (Object(obj) !== obj) return obj; // primitives
        if (hash.has(obj)) return hash.get(obj); // cyclic reference
        [Number, String, Boolean].forEach(function (type) {
            if (obj instanceof type) {
                return type(obj);
            }
        });
        if (Object.prototype.toString.call(obj) === "[object Array]") {
            result = [];
            obj.forEach(function (child, index, array) {
                result[index] = clone(child);
            });
        } else {
            // testing that this is DOM
            if (obj.nodeType && typeof obj.cloneNode == "function") {
                result = obj.cloneNode(true);
            } else if (obj instanceof Date) {
                result = new Date(obj);
            } else if (obj instanceof RegExp) {
                result = new RegExp(obj.source, obj.flags);
            } else if (obj.constructor) {
                new obj.constructor();
            } else if (
                result = {};
            for (var i in obj) {
                result[i] = this.deepClone(obj[i]);
            }
            )
        }
return result;
   },
throttle: function() {
    var timer = null;
    var previous = null;

    return function () {
        var now = +new Date();

        if (!previous) previous = now;
        console.log('offset', now - previous);
        if (now - previous > atleast) {
            fn();
            console.log('reset');
            // 重置上一次开始时间为本次结束时间
            previous = now;
        } else {
            clearTimeout(timer);
            timer = setTimeout(function () {
                console.log('triggered');
                fn();
            }, delay);
        }
    }
},
debounce: function (func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
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
        v = ['ms', 'O', 'Moz', 'Webkit'];
    if (s['transition'] == '') return true;
    while (v.length) {
        if (v.pop() + 'Transition' in s) {
            return true;
        }
    }
    return false;
},
format: function(date, fmt) {
    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'S': date.getMilliseconds()
    }

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ('' + date.getFullYear()).substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : String(o[k]).length == 1 ? "0" + o[k] : o[k]);
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
    for (var i = 0; i < ca.length; i++) {
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
    this.setCookie(cname, "", -1);
},
escapeLtSign: function(str) {
    let allTags = ('html,body,base,head,link,meta,style,title,' +
        'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
        'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
        'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
        's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
        'embed,object,param,source,canvas,script,noscript,del,ins,' +
        'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
        'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
        'output,progress,select,textarea,' +
        'details,dialog,menu,menuitem,summary,' +
        'content,element,shadow,template,blockquote,iframe,tfoot' +
        'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
        'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
        'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view').split(',');
    let tagName = '';
    let len = str.length;
    let stack = [];
    let res = str;
    let startFlag = false;
    for (let i = 0; i < len; i++) {
        if (str[i] == '<') {
            tagName = '';
            startFlag = true;
            stack.push({ pos: i });
        } else if (str[i] == '>') {
            if (startFlag) {
                startFlag = false;
                stack.pop();
                tagName = '';
            }
        } else {
            if (startFlag) {
                if (/[a-zA-Z\-]/.test(str[i])) {
                    tagName += str[i];
                } else {
                    if (!tagName || allTags.indexOf(tagName.toLowerCase()) == -1) {
                        stack.pop();
                        startFlag = false;
                        tagName = '';
                    }
                }
            }
        }
    }

    // console.log(stack);
    for (var j = stack.length - 1; j >= 0; j--) {
        let pos = stack[j].pos;
        res = res.substring(0, pos) + '&lt;' + res.substring(pos + 1);
    }

    return res;
},
checkDeviceScale: function () {
    var retValue = {
        zoom: 1,
        devicePixelRatio: window.devicePixelRatio,
        applicationPixelRatio: window.devicePixelRatio
    };

    var supportedScaleValues = [1, 1.5, 2];

    var systemScaling = window.devicePixelRatio;
    var bestIndex = 0;
    var bestDistance = Math.abs(supportedScaleValues[0] - systemScaling);
    var currentDistance = 0;
    for (var i = 1, len = supportedScaleValues.length; i < len; i++) {
        if (Math.abs(supportedScaleValues[i] - systemScaling) > 0.0001) {
            if (supportedScaleValues[i] > (systemScaling - 0.0001))
                break;
        }
        currentDistance = Math.abs(supportedScaleValues[i] - systemScaling);
        if (currentDistance < (bestDistance - 0.0001)) {
            bestDistance = currentDistance;
            bestIndex = i;
        }
    }

    retValue.applicationPixelRatio = supportedScaleValues[bestIndex];
    if (Math.abs(retValue.devicePixelRatio - retValue.applicationPixelRatio) > 0.01) {
        retValue.zoom = retValue.devicePixelRatio / retValue.applicationPixelRatio;
    }
    return retValue;
}
getAllUrlParams: function(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}
}
