function Stack(){
    this.items = [];
}

Stack.prototype = {
    constructor: Stack,
    push: function(item){
        this.items.push(item);
    },
    pop: function(){
        return this.items.pop();
    },
    peek: function(){
        return this.items[this.size() - 1];
    },
    isEmpty: function(){
        return this.items.length == 0;
    },
    size: function(){
        return this.items.length;
    },
    clear: function(){
        this.items.length = 0;
    },
    print: function(){
        console.log(this.items.toString());
    }
}

function toBinary(num){
    var stack = new Stack(),
        rem,
        binaryStr = '';

    while(num > 0){
        rem = Math.floor(num % 2);
        stack.push(rem);
        num = Math.floor(num / 2);
    }

    while(stack.size()){
        binaryStr += stack.pop().toString();
    }

    return binaryStr;

}

// console.log(toBinary(6113));


function baseConverter(decNumber,base){
    var stack = new Stack(),
        rem,
        baseStr = '',
        digits = '0123456789abcdef';
    while(decNumber > 0){
        rem = decNumber % base;
        stack.push(rem);
        decNumber = Math.floor(decNumber / base);
    }

    while(stack.size()){
        baseStr += digits[stack.pop()];
    }

    return baseStr;

}

// console.log(baseConverter(11255,16));
// console.log(baseConverter(100345, 8));
