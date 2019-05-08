Function.prototype.myOwnCall = function(oThis){
    var result,args = [];
    var uniqueId = '00' + Math.random();
    oThis = oThis || window;
    while(({}).hasOwnProperty.call(this,uniqueId)){
        uniqueId = '00' + Math.random();
    }

    oThis[uniqueId] = this;

    for(var i = 1;i < arguments.length;i++){
        args.push('arguments[' + i + ']');
    }
    result = eval('oThis[uniqueId](' + args + ')');
    delete this[uniqueId];
    return result;
}

Function.prototype.myOwnApply = function(oThis,arr){
    var result,args = [];
    var uniqueId = '00' + Math.random();
    oThis = oThis || window;
    while(({}).hasOwnProperty.call(this,uniqueId)){
        uniqueId = '00' + Math.random();
    }

    oThis[uniqueId] = this;

    for(var i = 0;i < arr.length;i++){
        args.push('arr[' + i + ']');
    }
    result = eval('oThis[uniqueId](' + args + ')');
    delete this[uniqueId];
    return result;
}

Function.prototype.myOwnBind = function(oThis){
    var args = ([]).slice.call(auguments,1);
    var self = this;
    var fNOP = function(){};
    var fBind = function(){
        var args2 = ([]).slice.call(auguments);
        self.apply(this instanceOf fNOP ? this : oThis,args.concat(args2));
    }
    if(this.prototype){
        fNOP.prototype = this.prototype;
    }
    fBind.prototype = new fNOP();

    return fBind;
}
