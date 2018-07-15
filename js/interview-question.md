## Array
```
['1','2','3'].map(parseInt)
['1','2','3'].map(parseFloat)
"1 2 3".replace(/\d/g, parseInt)
[3,2,1].reduce(Math.pow)
[].reduce(Math.pow)
```
## 类型转换
```
var a = [0];
if ([0]) {
  console.log(a == true);
} else {
  console.log("wut");
}
'5' + 3
'5' - 3
++[[]][+[]]+[+[]]
add(2)(3)(5)(10) = 20
```
## 流氓题
```
var a = Function.length,
    b = new Function().length
a === b

Object.getOwnPropertyDescriptor(Function,'length')
new Function('a', 'b', 'return a + b').length

var min = Math.min(), max = Math.max()
min < max

var a = new Date("2014-03-19"),
    b = new Date(2014, 03, 19);
[a.getDay() === b.getDay(), a.getMonth() === b.getMonth()]

3.toString()
3..toString()
3...toString()

var a = (1, 5 - 1) * 2;

2 in [1,2]

var a = 111111111111111110000,
    b = 1111;
a + b;
valueA + valueB(!= 0) === valueA;
0.1 + 0.2 == 0.3
Number.MAX_VALUE
//https://www.youtube.com/watch?v=MqHDDtVYJRI

function foo() { }
var oldName = foo.name;
foo.name = "bar";
[oldName, foo.name]

function a(x){
    return function b(y){
        return y+x++
    }
}
var a1 = a(10)
a1(10);
```
## 变量提升
```
//1
var a=0;
function aa(){
    alert(a)
    var a=3
}
aa();
```

```
//2
var a=0;
function aa(a){
    alert(a)
    var a=3
}
aa(5)
alert(a)
```

```
//3
var a=0;
function aa(a){
    alert(a)
    a=3
}
aa(5)
alert(a)
```

```
//4
var a=0;
function aa(a){
    alert(a)
    var a=3
    alert(a)
}
aa(5)
```

```
//5
var a=0;
function aa(a){
    alert(a)
    a=3
    alert(a)
}
aa()
alert(a)
```

```
//1
alert(a)
a();
var a=3;
function a(){
    alert(10)
}
alert(a)
a=6;
a();
```
```
//2
alert(a)
a();
var a=3;
var a=function(){
    alert(10)
}
alert(a)
a=6;
a();
```
```
//1
var a = 1;
function b() {
    a = 10;
    return;
    function a() {}
}
b();
console.log(a);
```
```
//1
function fn(a) {
  console.log(a);
  var a = 2;
  function a() {}
  console.log(a);
}

fn(1);
```
```
//1
if('a' in window) {
  var a = 10;
}
alert(a);
```
```
//1
function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();//注意优先级
new Foo().getName();
new new Foo().getName();//也是优先级
```
## this指向
```
var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);

//2
function fn() {
    this.a = 0;
    this.b = function() {
        alert(this.a)
    }
}
fn.prototype = {
    b: function() {
        this.a = 20;
        alert(this.a);
    },
    c: function() {
        this.a = 30;
        alert(this.a);
    }
}
var myfn = new fn();
myfn.b();
myfn.c();
```
### event loop
```
async function async1(){
	console.log('async1 start')
	await async2()
	console.log('async1 end')
}
async function async2(){
	console.log('async2')
}
console.log('script start')
setTimeout(function(){
	console.log('setTimeout')
},0)  
async1();
new Promise(function(resolve){
	console.log('promise1')
	resolve();
}).then(function(){
	console.log('promise2')
})
console.log('script end')
```
### eval
```
var y = 1;
if (function f(){}) {
    y += typeof f;
}
console.log(y);
```
### 作用域
```
//1
for(var i = 0; i < 10; i++) {
    setTimeout(function() {
      console.log(i);  
    }, 10);
}

//2
var value = 1;
function foo() {
    console.log(value);
}
function bar() {
    var value = 2;
    foo();
}
bar();

//3
var a = 10;
function f1(){
  console.log(a);
}

(function(f2){
  var a = 30;
  f2();
}(f1));

//4
function fun(n,o) {
  console.log(o)
  return {
    fun:function(m){
      return fun(m,n);
    }
  };
}
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1); c.fun(2); c.fun(3);

//5
falseStr = "false";

if(true){
  var falseStr;

  if(falseStr){
   console.log("false" == true);
   console.log("false" == false);
  }
}
```
### 赋值
```
var a = { n : 1};    
var b = a;    
a.x = a = {n:  2};    
console.log(a.x);
console.log(b.x);
https://stackoverflow.com/questions/49000564/whats-the-result-of-this-javascript-code-snippet-and-why

function  setName(obj){
    obj.name="tom";
    obj=new Object();
    obj.name="mike";
}
var  obj=new Object()                 
     setName(obj);
     console.log(obj.name);
```
### arguments
```
function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);

function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2);

//Arguments对象是活动对象的一个属性，它包括如下属性：
callee — 指向当前函数的引用
length — 真正传递的参数个数
properties-indexes (字符串类型的整数) 属性的值就是函数的参数值(按参数列表从左到右排列)。 properties-indexes内部元素的个数等于arguments.length. properties-indexes 的值和实际传递进来的参数之间是共享的。

当非严格模式中的函数有包含剩余参数、默认参数和解构赋值，那么arguments对象中的值不会跟踪参数的值（反之亦然）
function func(a = 55) {
  arguments[0] = 99; // updating arguments[0] does not also update a
  console.log(a);
}
func(10); // 10
```
