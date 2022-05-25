import util from './util.js';

class AccessControl{
    constructor(accessObj){
        this.accessObj = Object.assign({},accessObj);
        this.accessInterceptor = {};
    }

    hasKey(key){
        return util.hasOwn(this.accessObj,key);
    }

    get(key){
        if(!this.hasKey()) return false;
        return this.accessObj[key];
    }

    set(key,val){
        this.accessObj[key] = val;
        return this;
    }

    del(key){
        if(!this.hasKey()) return;
        delete this.accessObj[key];
    }

    addInterceptor(handler){
        
        let type = handler.type;

        if(Array.isArray(type)){
            type.forEach(t => this.handleEventBinding(t,handler));
        }else{
            this.handleEventBinding(type,handler);
        }

        return this;
    }

    handleEventBinding(type,handler){
        if(!this.accessInterceptor[type]){
            this.accessInterceptor[type] = {};
            this.accessInterceptor[type].handlers = [handler];
            let eventHandler = this.accessInterceptor[type].eventHandler = (e) => {
                let handlers = this.accessInterceptor[type].handlers;
                handlers.forEach(h => {
                    if(util.isMatched(e.target,h.ele) && !h.accessable){
                        e.stopPropagation();
                        if(util.isFunction(h.denyHandler)){
                            h.denyHandler(e.target);
                        }
                    }
                });
            }
            document.addEventListener(type,eventHandler,true);
        }else{
            this.accessInterceptor[type].handlers.push(handler)
        }
    }

    delInterceptor(type,ele){
        if(!this.accessInterceptor[type]) return this;
        if(!ele){ //没传入ele，全部删除
            this.removeEventBinding(type);
            this.accessInterceptor[type] = null;
        }else{ //匹配符合的ele,删除handler,删空的话也处理
            let handlers = this.accessInterceptor[type].handlers;
            let len = handlers.length;
            handlers = handlers.filter(handler => {
                if(Array.isArray(handler.ele)){  //如果是个数组，开始找到能不能匹配的，找到了移除，ele全部移除，handler也移除
                    let index;
                    if((index = util.findIndex(ele,handler.ele)) > -1){
                        handler.ele.splice(index,1);
                        if(handler.ele.length === 0) return false;
                    }
                }else{
                    return !util.isMatched(ele,handler.ele);
                }
                return true;
            });
            let newLen = handlers.length;
            if(len === newLen) return this;

            this.accessInterceptor[type].handlers = handlers;
            if(newLen === 0){
                this.removeEventBinding(type);
                this.accessInterceptor[type] = null;
            }
            return this;
        }

    }

    removeEventBinding(type){
        let eventHandler = this.accessInterceptor[type].eventHandler;
        document.removeEventListener(type,eventHandler,true);
    }


}


export default AccessControl;
