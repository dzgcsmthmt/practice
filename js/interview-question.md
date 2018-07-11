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

var a = 111111111111111110000,
    b = 1111;
a + b;
//https://www.youtube.com/watch?v=MqHDDtVYJRI
valueA + valueB(!= 0) === valueA;

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
//1
var a = 1;
function b() {
    a = 10;
    return;
    function a() {}
}
b();
console.log(a);
//1
function fn(a) {
  console.log(a);
  var a = 2;
  function a() {}
  console.log(a);
}

fn(1);
//1
if('a' in window) {
  var a = 10;
}
alert(a);
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
//1
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

//1
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
```
