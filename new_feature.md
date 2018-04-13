## Spread operator(拓展运算符)
参考：[mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
---
#### 拓展对象(new in ECMAScript 2018)
<pre>
    var obj1 = { foo: 'bar', x: 42 };
    var obj2 = { foo: 'baz', y: 13 };
    // var clonedObj = Object.assign({},obj1);
    var clonedObj = { ...obj1 };
    // Object { foo: "bar", x: 42 }
    var mergedObj = { ...obj1, ...obj2 };
    // Object { foo: "baz", x: 42, y: 13 }
</pre>

<em>在 ECMAScript 5 严格模式的代码中， 重复的属性名会被当做SyntaxError。引入计算的属性名以后，属性名会在运行时出现重复。ECMAScript 2015 移除了这个限制</em>  

---
## String 拓展方法
* String.prototype.padStart
* String.prototype.padEnd

---
## Array 拓展方法
* Array.prototype.includes

参考：[mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

#### Examples

<pre>
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(3, 3);  // false
[1,2,NaN].indexOf(NaN); //-1
[1, 2, NaN].includes(NaN); // true
[0,1,2].includes(-0); //true
Object.is(0,-0) // false
var arr = [NaN,1,2,1,NaN,0,-0];new Set(arr) //Set(4) {NaN, 1, 2, 0}
function isEqual(val,val2){
    //return val === val2 || (typeof val == 'number' && isNaN(val) && typeof val2 == 'number' && isNaN(val2));
    //return val === val2 || (Number.isNaN(val) && Number.isNaN(isNaN));
    return Object.is(val,val2);
}
</pre>

---
## Exponentiation

<pre>
    Math.pow(2,3) //8
    2**3 //8
</pre>

---
## Trailing Commas

<pre>
    [1,2,3,].length //3
    function a(a,b,c,){
       console.log(arguments.length);
    }
    a.length //3
</pre>

---
## Object.entries && Object.values
参考：[mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

<pre>
const anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.entries(anObj)); // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]
// getFoo is property which isn't enumerable
const myObj = Object.create({}, { getFoo: { value() { return this.foo; } } });
myObj.foo = 'bar';
console.log(Object.entries(myObj)); // [ ['foo', 'bar'] ]
// non-object argument will be coerced to an object
console.log(Object.entries('foo')); // [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]
// returns an empty array for any primitive type, since primitives have no own properties
console.log(Object.entries(100)); // [ ]
// iterate through key-value gracefully
const obj = { a: 5, b: 7, c: 9 };
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
}
//Converting an Object to a Map
const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
console.log(map); // Map { foo: "bar", baz: 42 }

</pre>

---
## async && await(千呼万唤始出来)
参考：[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

<pre>
function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

function delay2Seconds(){
    return setTimeout(() => {
        console.log(11);
    }, 2000);
}

async function asyncCall() {
    console.log('calling');
    var result = await resolveAfter2Seconds();
    //var result = await delay2Seconds();
    console.log(result);
    // expected output: "resolved"
}

asyncCall();

funcion a(){}
a.constructor //Function
a.prototype //{constructor:a}
a.__proto__ == Function.prototype
asyncCall.constructor
//AsyncFunction() { [native code] }
asyncCall.__proto__
//AsyncFunction {constructor: ƒ, Symbol(Symbol.toStringTag): "AsyncFunction"}
asyncCall.__proto__.__proto__ == Function.prototype
asyncCall.prototype
new asyncCall();

</pre>

* 异常处理

<pre>
async function getProcessedData(url) {
    let v;
    try {
        v = await downloadData(url);
    } catch (e) {
        v = await downloadFallbackData(url);
    }
    return processDataInWorker(v);
}
</pre>

<em>一首凉凉送给Generator</em>

---
## CSS变量
参考：[css varibles](https://medium.freecodecamp.org/everything-you-need-to-know-about-css-variables-c74d922ea855)
* 基本使用
<pre>
element {
    --main-bg-color: brown;
}
element {
    background-color: var(--main-bg-color);
}
:root {
    --main-bg-color: brown;
}
.one {
    color: white;
    background-color: var(--main-bg-color);
}
</pre>
* 继承(支持继承)
---
## Grid && Flexbox
参考：[grid](https://css-tricks.com/snippets/css/complete-guide-grid/#grid-introduction)
[flexbox](https://css-tricks.com/snippets/css/complete-guide-grid/#grid-introduction)
