var END = Math.pow(2, 53);
var START = END - 100;
var count = 0;
for (var i = START; i <= END; i++) { 
      count++;
}
console.log(count);

// A. 0
// B. 100
// C. 101
// D. other


function int2Binary(num){
    let res = '';
    while(num){
        res = (num & 1) + res;
        num = Math.floor(num / 2);
    }
    return res;
}

function float2Binary(num){
    let res = '';
    while(num){
        num = num * 2;
        res += (num & 1);
        num = num % 1;
        console.log(num);
    }
    return res;
}

const num = 2 ** 53;
console.log(int2Binary(num));
console.log(num.toString(2));

const fNum = 0.2;
console.log('0.' + float2Binary(fNum));
console.log(fNum.toString(2));
