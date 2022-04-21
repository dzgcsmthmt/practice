export default {
    isString: function(str){
        return typeof str === 'string';
    },
    isFunction: function(str){
        return typeof str === 'function';
    },
    isObject: function(str){
        return typeof str === 'object' && str !== null;
    },
    hasOwn: function(obj,key){
        return Object.prototype.hasOwnProperty.call(obj,key);
    },
    isMatched: function(target,ele){
        if(!Array.isArray(ele)){
            ele = [ele];
        };

        for(let i = 0,len = ele.length;i < len;i++){
            let item = ele[i];
            item = this.isString(item) ? document.querySelector(item) : item;
            if(target === item) return true;
        }

        return false;
    },
    findIndex: function(target,ele){
        if(!Array.isArray(ele)){
            ele = [ele];
        };

        for(let i = 0,len = ele.length;i < len;i++){
            let item = ele[i];
            item = this.isString(item) ? document.querySelector(item) : item;
            if(target === item) return i;
        }
        return -1;
    }
}