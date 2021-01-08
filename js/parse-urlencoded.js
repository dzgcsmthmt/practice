var str = 'a[0]=1';

function parseKeys(givenKey,val){
    var chains = [];

    var brackets = /(\[[^[\]]*\])/;
    var child = /(\[[^[\]]*\])/g;

    var segment = givenKey.match(brackets);
    var parent = segment ? givenKey.substr(0,segment.index) : givenKey;

    if(parent){
        chains.push(parent);
    }

    while(segment = child.exec(givenKey)){
        chains.push(segment[1]);
    }

    return parseObject(chains,val);
}

function parseObject(chain,val){
    var obj = val;
    var len = chain.length;
    for(var i = len - 1;i >= 0;i--){
        let item = {};
        let root = chain[i];
        var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
        item[cleanRoot] = obj;
        obj = item;
    }

    return obj;
}

var [key,value] = str.split('=');

console.log(parseKeys(key,value));