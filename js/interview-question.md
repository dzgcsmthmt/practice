## Array high order method
```
['1','2','3'].map(parseInt)
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
valueA + valueB(!= 0) === valueA;
function foo() { }
var oldName = foo.name;
foo.name = "bar";
[oldName, foo.name]
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
