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

---
## Page Visibility API
参考：[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Page_Visibility_API)
###  属性
* document.hidden Read only
> 如果页面处于被认为是对用户隐藏状态时返回true，否则返回false。
* document.visibilityState  Read only
> * visible : 页面内容至少是部分可见。 在实际中，这意味着页面是非最小化窗口的前景选项卡。
> * hidden : 页面内容对用户不可见。 在实际中，这意味着文档可以是一个后台标签，或是最小化窗口的一部分，或是在操作系统锁屏激活的状态下。
> * prerender : 页面内容正在被预渲染且对用户是不可见的(被document.hidden当做隐藏). 文档可能初始状态为prerender，但绝不会从其它值转为该值。 注释：浏览器支持是可选的。
> * unloaded : 页面正在从内存中卸载。 注释：浏览器支持是可选的。

### 事件
* visibilityChange

<em>iframe的可见性状态等同于它的父层document 。用CSS属性隐藏iframe并不会触发visibility事件也不会改变内容文本的状态。</em>

---
## Battery Status API
参考：[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Page_Visibility_API)
[w3c](https://www.w3.org/TR/battery-status/#examples)
<pre>
partial interface Navigator {
    Promise<BatteryManager> getBattery();
};

interface BatteryManager : EventTarget {
    readonly attribute boolean             charging;
    readonly attribute unrestricted double chargingTime;
    readonly attribute unrestricted double dischargingTime;
    readonly attribute double              level;
            attribute EventHandler        onchargingchange;
            attribute EventHandler        onchargingtimechange;
            attribute EventHandler        ondischargingtimechange;
            attribute EventHandler        onlevelchange;
};
</pre>

---
## Notification
参考：[mdn](https://developer.mozilla.org/en-US/docs/Web/API/notification)

---
## Navigator.vibrate()
参考：[mdn](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate)
<pre>
window.navigator.vibrate(200); // vibrate for 200ms
window.navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]); // Vibrate 'SOS' in Morse.
</pre>

---
## input
参考：[smashingmagazine](https://www.smashingmagazine.com/2016/12/the-not-so-secret-powers-of-the-mobile-browser/)
```
<input type="file" id="capture" name="capture" accept="image/*" capture="camera">
<input type="file" id = "video" name="video" accept="video/*" capture="camcorder">
<input type="file" id="audio" name="audio" accept="audio/*" capture="microphone">
```
---
## Media Capture and Streams
参考：[w3c](https://www.w3.org/TR/mediacapture-streams//)
