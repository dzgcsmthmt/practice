(function(win) {

    const CODEMSG = (code,msg) => {
        switch (+code) {
            case 0:
                msg = "操作成功";
                break;
            case 2003:
                msg = "请开启麦克风权限";
                break;
            default:
                msg = "请求超时，请稍后重试";
                break;
        }
        return msg;
    };

    var id = 0,
        callbacks = {},
        errorCallbacks = {},
        registerFuncs = {};

    let nativeBridge = () => {
        if ('nativeBridge' in win || win.webkit.messageHandlers.nativeBridge) {
            return nativeBridge;
        } else {
            console.log("NATIVE IS NOT OKAY DEVICE");
            return null;
        }
    };

    let receiveMessage = msg => {
        console.log('native receiveMessage', msg);

        var type = msg.type,
            data = msg.data || {},
            // Native 将 callbackId 原封不动传回
            callbackId = msg.callbackId,
            responstId = msg.responstId;
        // type 和 callbackId 不会同时存在

        if ('callbackId' in msg) {
            // 找到相应句柄
            if (msg.code == 0 && callbacks[callbackId]) {
                callbacks[callbackId](msg.data);
            } else if (msg.code != 0) {
                let showMsg = true;
                if (errorCallbacks[callbackId]) {
                    showMsg = errorCallbacks[callbackId](msg)
                }
                showMsg = true;
                showMsg && win.forwarding.callCommand("NATIVE.toast", {
                    message: CODEMSG(msg.code,msg.msg)
                });
            }
            delete callbacks[callbackId];
            delete errorCallbacks[callbackId];

        } else if (type) {
            if (registerFuncs[type] && registerFuncs[type][data.category]) {
                var ret = {},
                    flag = false;
                registerFuncs[type][data.category].forEach(function(callback) {
                    callback(data, function(r) {
                        flag = true;
                        ret = Object.assign(ret, r);
                    });
                });
                if (flag) {
                    // 回调 Native 收到
                    //nativeBridge.postMessage();
                    return JSON.stringify({
                        responstId: responstId,
                        ret: ret
                    })
                }
            }
        }
    }

    if (nativeBridge) {

        win.JSBridge = {
            // 发送
            send: function(type, data, callback, errorCallback) {
                // 获取唯一 id

                var thisId = id++;
                // console.log('send',type,data, 'callbackId',thisId);
                // 存储 Callback
                callbacks[thisId] = callback;
                errorCallbacks[thisId] = errorCallback;

                let postD = JSON.stringify({
                    type: type,
                    data: data || {},
                    callbackId: thisId
                });
                //传到 Native 端
                // console.log(window.nativeBridge);
                if ("nativeBridge" in win) {
                    win.nativeBridge.postMessage(postD);
                }else if(win.webkit && win.webkit.messageHandlers && win.webkit.messageHandlers.nativeBridge){
                    win.webkit.messageHandlers.nativeBridge.postMessage(postD);
                }else {
                    console.log("NATIVEBRIDGE IS NOT IN WINDOW");
                }
            },
            // 响应发送后的回调
            receiveMessage: receiveMessage,
            // 注册监听
            register: function(type, category, callback) {
                if (!registerFuncs[type]) {
                    registerFuncs[type] = {};
                }
                if (!registerFuncs[type][category]) {
                    registerFuncs[type][category] = [];
                }

                // 存储回调
                registerFuncs[type][category].push(callback);
            }
        };

        if(/IOS|iPad|iPhone|iPod/i.test(navigator.userAgent)){
            window.receiveMessage = receiveMessage;
        }

    }else{
        win.JSBridge = {
            send: () => {},
            register: () => {}
        }
    }
})(window);

export default window.JSBridge;
