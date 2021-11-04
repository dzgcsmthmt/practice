// https://github.com/liriliri/eruda/blob/v1.10.3/src/lib/util.js
// https://github.com/facebook/react/blob/main/packages/react-dom/src/events/SyntheticEvent.js
// https://github.com/vuejs/vue/blob/dev/src/core/instance/events.js

import EnhancedEvent from './enhanceEvent.js';
import { isFunction } from './util.js';

const okEvent = {
    on: function(ele,type,selector,handler){
        //文本节点，注释节点直接返回
        if(!ele || ele.nodeType === 3 || ele.nodeType === 8 || !ele.style) return;
        //判断有没有selector
        if(isFunction(selector)){
            handler = selector;
            selector = '';
        }
        //初始化events
        if(!ele.events){
            ele.events = {};
        }
        //初始化绑定函数、handlers,初始化delegateCount
        let handlers,eventHandler;
        if(!(eventHandler = ele.eventHandler)){
            eventHandler = ele.eventHandler = function(){
                okEvent.dispatch.apply(ele,arguments);
            }
        }

        if(!(handlers = ele.events[type])){
            handlers = ele.events[type] = [];
            handlers.delegateCount = 0;
            ele.addEventListener(type,eventHandler);
        }

        //添加回调函数，委托前加，否则后加
        let handlerObj = {
            selector,
            handler
        }

        if(selector){
            handlers.splice(handlers.delegateCount++,1,handlerObj);
        }else{
            handlers.push(handlerObj);
        }
        
        return this;

    },
    off: function(ele,type,selector,handler){
        //文本节点，注释节点直接返回
        if(!ele || ele.nodeType === 3 || ele.nodeType === 8 || !ele.style) return;
        //判断有没有selector
        if(isFunction(selector)){
            handler = selector;
            selector = '';
        }
        //没有传入type,取消全部的事件绑定 删除属性
        if(!type){
            Object.keys((ele.events || {})).forEach(key => {
                ele.removeEventListener(key,ele.handlerObj);
            });
            delete ele.events;
            delete ele.eventHandler;
            return
        }
        //删除匹配的回调函数，有selector，delegateCount--
        let j,len;
        let handlers = ele.events[type];
        j = len = handlers.length;

        while(j--){
            let handleObj = handlers[j];
            if((!selector || handleObj.selector == selector) && (!handler || handleObj.handler === handler)){
                handlers.splice(j,1);
                if(selector){
                    handlers.delegateCount--;
                }
            }
        }
        
        //删除后变成空 取消事件绑定 删除属性
        if(len && handlers.length === 0){
            ele.removeEventListener(type,ele.handlerObj);
            delete ele.events[type];
        }
        //全部删空了 删除属性；

        if(Object.keys(ele.events).length === 0){
            delete ele.events;
            delete ele.eventHandler;
        }

        return this;

    },
    dispatch: function(event){
        //获取参数，获取handlers，增强event
        let args = Array.from(arguments);
        let handlers = (this.events || {})[event.type] || [];
        event = args[0] = new EnhancedEvent(args[0])
        //获取要执行的回调函数
        let queue = okEvent.handlers.call(this,event,handlers);
        //根据事件是否阻止冒泡依次执行回调
        //执行函数返回false 执行默认 冒泡

        let i = 0,match;

        while((match = queue[i++]) && !event.isPropagationStopped()){
            event.currentTarget = match.ele;
            let handleObj,j = 0,handlers = match.handlers;
            while((handleObj = handlers[j++]) && !event.isImmediatePropagationStopped()){
                let res = handleObj.handler.apply(match.ele,args);
                if(res === false){
                    event.stopPropagation();
                    event.preventDefault();
                }
            }

        }

    },
    handlers: function(event,handlers){
        //根据冒泡整层收集回调
        //如果有delegateCount，遍历全部符合条件的hanlder
        let queue = [],cur = event.target;
        let delegateCount = handlers.delegateCount || 0;
        
        for(;cur != this; cur = cur.parentNode || this){
            let matches = [];
            if(delegateCount > 0){
                for(let j = 0; j < delegateCount;j++){
                    let handlerObj = handlers[j];
                    if(cur.matches(handlerObj.selector)){
                        matches.push(handlerObj);
                    }
                }
            }
            if(matches.length){
                queue.push({ele: cur,handlers: matches})
            }
        }

        //收集当前绑定元素的回调
        if(delegateCount < handlers.length){
            queue.push({ele: this,handlers: handlers.slice(delegateCount)});
        }

        return queue;

    }
}

export default okEvent;