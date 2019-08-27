// if(document.addEventListener){
//     this.addEvent = function(elem,type,fn){
//         elem.addEventListener(type,fn,false);
//         return fn;
//     }
//     this.removeEvent = function(elem,type,fn){
//         elem.removeEventListener(type,fn,false);
//     }
// }else if (document.attachEvent) {
//     this.addEvent = function(elem,type,fn){
//         var bound = function(){
//             var arg = ([]).slice.call(arguments);
//             return fn.apply(elem,[fixEvent(window.event)].concat(arg));
//         }
//         elem.attachEvent('on' + type,bound);
//         return bound;
//     }
//     this.removeEvent = function(elem,type,fn){
//         elem.detachEvent('on' + type,fn);
//     }
// }

function fixEvent(event){
    function returnTrue(){return true;}
    function returnFalse(){return false;}

    if(!event || !event.stopPropagation){
        var old = event || window.event;
        event = {};

        //clone prop
        for(var prop in old){
            event[prop] = old[prop];
        }

        if(!event.target){
            event.target = event.srcElement || document;
        }

        event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;

        event.preventDefault = function(){
            event.returnValue = false;
            event.isDefaultPrevented = returnTrue;
        }

        event.isDefaultPrevented = returnFalse;

        event.stopPropagation = function(){
            event.cancelBubble = true;
            event.isPropagationStopped = returnTrue;
        }
        event.isPropagationStopped = returnFalse;

        event.stopImmediatePropagation = function(){
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        }
        event.isImmediatePropagationStopped = returnFalse;

        if(event.clientX != null){
            var doc = document.documentElement,body = document.body;
            event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.ClientLeft || body && body.ClientLeft || 0);
            event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.ClientTop || body && body.ClientTop || 0);
        }

        event.which = event.charCode || event.keyCode;

        if(event.button != null){
            event.button = event.button & 1 ? 0 : (event.button & 4 ? 1 : event.button & 2 ? 2 : 0)
        }

    }

    return event;
}

function tidyUp(elem,type){
    var data = getData(elem);
    if(data.handlers[type].length == 0){
        delete data.handlers[type];
        if(document.removeEventListener){
            elem.removeEventListener(type,data.dispatcher,false);
        }else if(document.detachEvent) {
            elem.detachEvent('on' + type,data.dispatcher);
        }
    }

    if(isEmpty(data.handlers)){
        delete data.handlers;
        delete data.dispatcher;
    }

    if(isEmpty(data)){
        removeData(elem);
    }
}

function isEmpty(obj){
    for (var prop in obj) {
        return false;
    }
    return true;
}

(function(){
    var cache = {},
        guidCounter = 1,
        expando = "data" + (new Date()).getTime();

    this.getData = function(elem){
        var guid = elem[expando];
        if(!guid){
            guid = elem[expando] = guidCounter++;
            cache[guid] = {};
        }
        return cache[guid];
    }

    this.removeData = function(elem){
        var guid = elem[expando];
        if(!guid){
            return;
        }

        delete cache[guid];

        try{
            delete elem[expando];
        }catch(e){
            if(elem.removeAttribute){
                elem.removeAttribute(expando);
            }
        }

    }

})();

(function(){
    var nextGuid = 1;
    this.addEvent = function(elem,type,fn){
        var data = getData(elem);
        if(!data.handlers){
            data.handlers = {};
        }

        if(!data.handlers[type]){
            data.handlers[type] = [];
        }

        if(!fn.guid){
            fn.guid = nextGuid++;
        }

        data.handlers[type].push(fn);

        if(!data.dispatcher){
            data.disabled = false;
            data.dispatcher = function(event){
                if(data.disabled){
                    return;
                }
                var handlers = data.handlers[type];
                if(handlers){
                    for (var i = 0; i < handlers.length; i++) {
                        handlers[i].call(elem, fixEvent(event));
                    }
                }
            }
        }

        if(data.handlers[type].length == 1){
            if(document.addEventListener){
                elem.addEventListener(type,data.dispatcher,false);
            }else if(document.attachEvent){
                elem.attachEvent('on' + type,data.dispatcher);
            }
        }

    }

    this.removeEvent = function(elem,type,fn){
        var data = getData(elem);
        if(!data.handlers){
            return;
        }
        var removeType = function(type){
            data.handlers[type] = [];
            tidyUp(elem,type);
        }

        if(!type){
            for (var t in data.handlers) {
                removeType(t);
            }
            return;
        }

        var handlers = data.handlers[type];
        if(!handlers){
            return;
        }

        if(!fn){
            removeType(type);
            return;
        }

        if(fn.guid){
            for (var i = 0; i < handlers.length; i++) {
                if(handlers[i].guid == fn.guid){
                    handlers.splice(i--,1);
                }
            }
        }

        tidyUp(elem,type);

    }

})();

function triggerEvent(elem,event){
    var elemData = getData(elem);
    var parent = elem.parentNode || elem.ownerDocument;

    if(typeof event === 'string'){
        event = {type: event,target: elem};
    }
    event = fixEvent(event);

    if(elemData.dispatcher){
        elemData.dispatcher.call(elem,event);
    }

    if(parent && !event.isPropagationStopped()){
        triggerEvent(parent,event);
    }else if (!parent && !event.isDefaultPrevented()) {
        var targetData = getData(event.target);
        if(event.target[event.type]){
            targetData.disabled = true;
            event.target[event.type]();
            targetData.disabled = false;
        }
    }

}
