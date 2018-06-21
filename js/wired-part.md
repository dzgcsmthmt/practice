```
function foo(obj){
    var a = 3;
    with(obj){
        a = 2;
    }
    console.log(a);
}

var o2 = {b: 1};
foo(o2);
console.log(o2);
console.log(typeof a);
```
with产生了一个新的作用域，obj的变量就是作用域的值，找得到就赋值，找不到值会向外层作用域冒泡，直到根作用域
