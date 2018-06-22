;(function(fe) {

    (function preloadGif() {
        var oImg = new Image();
        oImg.src = '/staticPlatformH5/common/img/loading.gif';
    })();

    function loading() {
        var layer = document.createElement('div');
        layer.id = 'loading-overlay';
        layer.style.cssText = 'width: 100%;height: 100%;top: 0;left: 0;position: fixed;z-index: 99999;background: rgba(0,0,0,0.3);';
        var oImg = new Image();
        oImg.src = '/staticPlatformH5/common/img/loading.gif';
        oImg.style.cssText = 'width: 1.5rem;height: 1.5rem;top: 50%;left: 50%;position: absolute;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);';
        layer.appendChild(oImg);
        document.body.appendChild(layer);
    };

    fe.util = {
        // URL: location.host == 'm.okay.cn' ? 'https://www.okay.cn' : 'https://hotfix.mall.xk12.cn',
        URL: '//istudy.okay.cn/',
        DevelopUrl: 'https://xin.i.mall.xk12.cn/',
        payUrl: '//xin.pay.xk12.cn/',
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

        isInOkayApp: function(){
            return /com.okay.education/i.test(navigator.userAgent);
        },

        isOkayIOS: function(){
            return /IOS/i.test(navigator.userAgent);
        },

        tplEngine: function(tpl, data) {
            var match,
                reg = /<%(.+)?%>/g,
                regOut = /(^(\s)+(if|for|else|switch|case|break|{|}))(.*)?/g,
                code = 'var r=[];\n',
                cursor = 0;

            var add = function(line, js) {
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
        debounce: function(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate)
                        func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow)
                    func.apply(context, args);
            };
        },
        transition: function() {
            var temp,
                s = document.createElement('p').style,
                v = ['ms', 'O', 'Moz', 'Webkit'];

            //标准
            if (s['transition'] == '')
                return 'transition';

            //前缀
            while (v.length) {
                temp = v.pop() + 'Transition';
                if (temp in s) {
                    return temp;
                }
            }
        },
        extendDefaults: function(source, properties) {
            var property;
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        }
    };

    fe.ajax = function(options) {

        if (options.isLoading !== false) {
            loading();
        }

        return $.ajax({
            type: options.type || 'get',
            url: fe.util.URL + options.url,
            data: options.data || {},
            timeout: 5000,
            dataType: "json",
        }).then(function(data) {
            options.isLoading !== false && $('#loading-overlay').remove();
            if (/200$/.test(data.status)) {
                return data.data;
            } else {
                fe.popUp(data.msg);
                return $.Deferred().reject(data.data);
            }
        }, function(xhr, error) {
            var tip = "parsererror" == error ? "数据返回格式错误 " : "网络异常";
            options.isLoading !== false && $('#loading-overlay').remove();
            fe.popUp(tip);
            return $.Deferred().reject(error);
        });

    };

    fe.ajaxJsonp = function(options) {

        if (options.isLoading !== false) {
            loading();
        }

        return $.ajax({
            type: options.type || 'get',
            url: fe.util.URL + options.url,
            data: options.data || {},
            dataType: "jsonp",
            timeout: 5000
        }).then(function(data) {
            options.isLoading !== false && $('#loading-overlay').remove();
            if (/200$/.test(data.status)) {
                return data.data;
            } else {
                fe.popUp(data.msg);
                return $.Deferred().reject(data.data);
            }
        }, function(xhr, error) {
            var tip = "parsererror" == error ? "数据返回格式错误 " : "网络异常";
            options.isLoading !== false && $('#loading-overlay').remove();
            fe.popUp(tip);
            return $.Deferred().reject(error);
        });

    };

    fe.popUp = function(str, options) {
        options = options || {};
        $("#pop-layer-box").remove();
        var elem = $("<div><div/>").prop({id: "pop-layer-box"}).css({
            "max-width": "82%",
            "position": "fixed",
            "z-index": "9999",
            "background-color": options.backgroundColor || "rgba(0,0,0,0.5)",
            "color": "#fff",
            "font-size": options.fontSize || "0.28rem",
            "top": "50%",
            "left": "50%",
            "opacity": 0,
            "transform": "translate3d(-50%,-50%,0) scale(1.15)",
            "-webkit-transform": "translate3d(-50%,-50%,0) scale(1.15)",
            "transition": "0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946)",
            "-webkit-transition": "0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946)",
            "padding": "0.15rem 0.3rem",
            "border-radius": "4px"
        }).html(str).appendTo(document.body);

        setTimeout(function() {
            elem.css({"opacity": 1, "transform": "translate3d(-50%,-50%,0) scale(1)", "-webkit-transform": "translate3d(-50%,-50%,0) scale(1)", "-webkit-transition": "0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);", "transition": "0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);"})
        }, 50);

        setTimeout(function() {
            elem.css({"opacity": 0, "transform": "translate3d(-50%,-50%,0) scale(1.15)", "-webkit-transform": "translate3d(-50%,-50%,0) scale(1.15)"});
            elem.one('transitionend webkitTransitionEnd', function() {
                elem.remove();
                options.callback && options.callback();
            });
        }, options.delay || 2000);

    };

    fe.Dialog = function(option) {
        this.modal = null;
        this.overlay = null;
        // Define option defaults
        var defaults = {
            closeButton: false,
            title: "",
            content: "",
            width: '72%',
            overlay: true,
            dropback: false,
            position: 'middle'
        }
        this.options = fe.util.extendDefaults(defaults, option || {});
        this.init();
    };

    fe.Dialog.prototype = {
        constructor: fe.Dialog,
        init: function(){
            this.render();
            this.bindEvent();
            if(this.options.mounted && typeof this.options.mounted == 'function'){
                this.options.mounted.apply(this);
            }
        },
        render: function(){
            var header,content, contentHolder,footer,docFrag,buttons,btn;
            var self = this;
            docFrag = document.createDocumentFragment();

            // If overlay is true, add one
            if (this.options.overlay) {
                this.overlay = document.createElement("div");
                this.overlay.className = "dialog-overlay";
                docFrag.appendChild(this.overlay);
            }

            // Create modal element
            this.modal = document.createElement("div");
            if(this.options.position == 'bottom'){
                this.modal.className = "dialog-modal bottom " + (this.options.className || '');
            }else{
                this.modal.className = "dialog-modal " + (this.options.className || '');
                this.modal.style.width = this.options.width;
            }

            //Create header and append to modal
            if(this.options.title){
                this.modal.appendChild(this.createHeader());
            }

            // Create content area and append to modal
            contentHolder = document.createElement("div");
            contentHolder.className = "dialog-content";
            if (typeof this.options.content === "string") {
                content = this.options.content;
            } else {
                content = this.options.content.innerHTML;
            }
            contentHolder.innerHTML = content;
            this.modal.appendChild(contentHolder);

            // Create footer area and append to modal
            if(this.options.footer){
                this.modal.appendChild(this.createFooter());
            }

            // Append modal to DocumentFragment
            if(this.options.overlay){
                this.overlay.appendChild(this.modal);
                docFrag.appendChild(this.overlay);
            }else{
                docFrag.appendChild(this.modal);
            }

            // Append DocumentFragment to body
            document.body.appendChild(docFrag);
        },
        createHeader: function(){
            var close,btns,header = document.createElement("div");
            header.className = "dialog-header";
            header.innerHTML = this.options.title;
            //Add customed buttons
            if(({}).toString.call(this.options.header) == '[object Object]'){
                if(btns = this.options.header.btns){
                    this.createBtns(btns,'header',header);
                }
            }else{
                //Create close button
                if(this.options.closeButton){
                    close = document.createElement("i");
                    close.className = 'dialog-close-btn icon';
                    header.appendChild(close);
                }
            }

            return header;
        },
        createFooter: function(){
            var btns,footer = document.createElement("div");
            footer.className = "dialog-footer dialog-footer-text";
            if (typeof this.options.footer === "string") {
                footer.innerHTML = this.options.footer;
            } else if(this.options.footer.nodeType) {
                footer.innerHTML = this.options.footer.innerHTML;
            }else if(({}).toString.call(this.options.footer) == '[object Object]'){
                footer.className = "dialog-footer";
                if(btns = this.options.footer.btns){
                    this.createBtns(btns,'footer',footer);
                }
            }
            return footer;
        },
        createBtns: function(btns,type,wrapper){
            var btn;
            for (var i = 0,len = btns.length; i < len; i++) {
                btn = document.createElement("button");
                btn.eventHandler = btns[i].cb;
                btn.appendChild(document.createTextNode(btns[i].text));
                if(type == 'header'){
                    btn.className = 'btn btn-link-primary ' + (btns[i].className || '');
                }else{
                    btn.className = 'btn ' + (len == 1 ? 'btn-block btn-primary ' : (i == 0 ? 'btn-outline-primary btn-col ' : 'btn-primary btn-col ')) + (btns[i].className || '');
                }
                wrapper.appendChild(btn);
            }
        },
        bindEvent: function(){
            var self = this;
            $('.dialog-modal .btn').on('tap',function(ev){
                ev.preventDefault();
                if(this.eventHandler && typeof this.eventHandler == 'function'){
                    this.eventHandler.call(self);
                }
            });
            $('.dialog-modal .dialog-close-btn').on('tap',function(ev){
                ev.preventDefault();
                self.close();
            });
        },
        close: function(){
            $('.' + (this.options.overlay ? 'dialog-overlay' : 'dialog-modal')).remove();
            $('.dialog-modal .btn').off('tap');
            $('.dialog-modal .dialog-close-btn').off('tap');
            if(this.options.unmounted && typeof this.options.unmounted == 'function'){
                this.options.unmounted.call(this);
            }
        }
    };

    fe.alert = function(opt){
        var option = {
            footer: {
                btns: [
                    {
                        text: opt.btnText || '确定',
                        cb: function(){
                            this.close();
                        }
                    }
                ]
            }
        };
        if(typeof opt == 'string'){
            option.content = opt;
        }else{
            option = fe.util.extendDefaults(option, opt || {});
        }
        return new fe.Dialog(option);
    };

    fe.confirm = function(opt){
        var option = {
            footer: {
                btns: [
                    {
                        text: opt.texts && opt.texts[0] || '取消',
                        cb: function(){
                            this.close();
                        }
                    },
                    {
                        text: opt.texts && opt.texts[1] || '确定',
                        cb: function(){
                            opt.onaccept.call(this);
                        }
                    }
                ]
            }
        };
        option.title = opt.title;
        option.content = opt.content;
        return new fe.Dialog(option);
    };

    fe.dialog = function(opt){
        var option = {
            closeButton: true,
            position: 'bottom'
        };
        option = fe.util.extendDefaults(option, opt || {});
        return new fe.Dialog(option);
    };

})(window.fe = window.fe || {});
