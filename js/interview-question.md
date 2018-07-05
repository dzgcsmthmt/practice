```
//Array high order method
['1','2','3'].map(parseInt)
[3,2,1].reduce(Math.pow)
[].reduce(Math.pow)
```

```
//类型转换
var a = [0];
if ([0]) {
  console.log(a == true);
} else {
  console.log("wut");
}
'5' + 3
'5' - 3
```

```
//流氓题
var a = Function.length,
    b = new Function().length
a === b
var min = Math.min(), max = Math.max()
min < max
var a = new Date("2014-03-19"),
    b = new Date(2014, 03, 19);
[a.getDay() === b.getDay(), a.getMonth() === b.getMonth()]
3.toString()
3..toString()
3...toString()
```

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
