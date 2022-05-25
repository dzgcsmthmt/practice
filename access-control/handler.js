import util from './util.js';

/***
 * @param {string | object | array} type  拦截的事件类型 click、mousedown 支持数组形式，可以一次传入多个
 * @param {string | Element | array} ele： 拦截的dom元素 支持selector '#a' document.querySelector('#a); 支持数组形式，可以一次传入多个
 * @param {boolean} accessable: 是否有权限
 * @param {function} denyHandler: 被拦截的处理函数
 */
class AccessHandler{
    constructor(type,ele,accessable,denyHandler) {
        if(util.isObject(type) && !Array.isArray(type)){
            this.type = type.type;
            this.ele = type.ele;
            this.accessable = type.accessable;
            this.denyHandler = type.denyHandler;  
        }else{
            this.type = type;
            this.ele = ele;
            this.accessable = accessable;
            this.denyHandler = denyHandler;
        }
    }

    getType(){
        return this.type;
    }

    setType(type){
        this.type = type;
        return this;
    }

    getEle(){
        return this.ele;
    }

    setEle(ele){
        this.ele = ele;
    }

    getAccessable(){
        return this.accessable;
    }

    setAccessable(accessable){
        this.accessable = accessable;
        return this;
    }

    getDenyHandler(){
        return this.getDenyHandler;
    }

    setDenyHandler(denyHandler){
        this.denyHandler = denyHandler;
        return this;
    }
}

export default AccessHandler;

