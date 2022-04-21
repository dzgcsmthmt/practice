class Sdk{
    constructor(){
        this.interceptorsMap = new Map();
    }

    getUserList(token){
        console.log(token);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('abc');
            },3000);
        })
    }

    addRequestInterceptor(keyName,handler){
        if(!keyName in this) return;
        this.handleFetchInterceptor(keyName,'request',handler);
    }

    addResponseInterceptor(keyName,handler){
        if(!keyName in this) return;
        this.handleFetchInterceptor(keyName,'response',handler);
    }

    handleFetchInterceptor(keyName,type,handler){
        let _this = this,handlerObj;
        if(!(handlerObj = this.interceptorsMap.get(keyName))){
            let originCall = this[keyName];
            this.interceptorsMap.set(keyName,{[type + 'Handlers']: [handler],originCall});
            this[keyName] = function(param){
                let interceptor = _this.interceptorsMap.get(keyName);

                let requestHandlers,responseHandlers;
                if(requestHandlers = interceptor.requestHandlers){
                    for(let i = 0;i < requestHandlers.length;i++){
                        param = requestHandlers[i](param);
                    }
                }

                let res = interceptor.originCall(param);
                if(responseHandlers = interceptor.responseHandlers){
                    for(let i = 0;i < responseHandlers.length;i++){
                        res = res.then(responseHandlers[i]);
                    }
                }
                return res;

            }
        }else{
            if(handlerObj[type + 'Handlers']){
                handlerObj[type + 'Handlers'].push(handler);
            }else{
                handlerObj[type + 'Handlers'] = [handler];
            }
            
        }
    }

    addListenrInterceptor(listenName,handler){

    }

    removeRequestInterceptor(keyName,handler){
        if(!keyName in this) return;
        this.removeFetchInterceptor(keyName,'request',handler);
    }

    removeResponseInterceptor(keyName,handler){
        if(!keyName in this) return;
        this.removeFetchInterceptor(keyName,'response',handler);
    }

    removeFetchInterceptor(keyName,type,handler){
        if(!keyName in this) return;
        let interceptor;
        if(interceptor = this.interceptorsMap.get(keyName)){
            let handlers = interceptor[type + 'Handlers'];
            if(handlers){
                if(typeof handler === 'undefined'){
                    delete interceptor[type + 'Handlers'];
                }else{
                    let index = interceptor[type + 'Handlers'].indexOf(handler);
                    if(index > -1){
                        interceptor[type + 'Handlers'].splice(index,1);
                    }
                }
            }
        }
    }

    removeListenrInterceptor(listenName,handler){

    }

}


var sdk = new Sdk();
let req1 = param => {return {data: param}};
let res1 = data => data + '1qa';
let res2 = data => data + '2ws';

sdk.addRequestInterceptor('getUserList',req1);

sdk.addResponseInterceptor('getUserList',res1);
sdk.addResponseInterceptor('getUserList',res2);

sdk.getUserList('token').then(data => console.log(data));