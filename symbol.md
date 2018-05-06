## subArray

<pre>
    function Array1(){}
    Array1.prototype = [];

    function Array2(){}
    Array2.prototype = Object.create(Array.prototype);

    class myArray extends Array{}

    var arr = new Array1(1,2,3);
    console.log(arr.length);    //0
    var arr2 = new Array2(1,2,3);
    console.log(arr2.length);   //0
    var arr3 = new myArray(1,2,3);
    console.log(arr3.length);   //3
</pre>

> 性能

参考：[Subclassing Arrays in ES2015](https://thejsguy.com/2017/09/21/subclassing-arrays-in-es2015.html)

---

<pre>
    0 == []
    false == []
    '' == []
    [] == ![]
    [] + []
    {} + {}
    [] + {}
    {} + []
</pre>

??? toPrimitive ??? 一脸懵逼.png

参考：[ECMA-262](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-toprimitive)

#### ToPrimitive(input [, PreferredType])

> 1. 如果没有传入PreferredType参数，则让hint的值为'default'
2. 否则，如果PreferredType值为String，则让hint的值为'string'
3. 否则，如果PreferredType值为Number，则让hint的值为'number'
4. 如果input对象有@@toPrimitive方法，则让exoticToPrim的值为这个方法，否则让exoticToPrim的值为undefined
5. 如果exoticToPrim的值不为undefined，则
	a.让result的值为调用exoticToPrim后得到的值
	b.如果result是原值，则返回
	c.抛出TypeError错误
6. 否则，如果hint的值为'default'，则把hint的值重新赋为'number'
7. 返回 OrdinaryToPrimitive(input,hint)

---

>提供了以下两个方法
1. valueOf
2. toString

<em>顺序：转化为字符串先调用toString，后valueOf，否则就先调用valueOf再调用toString</em>

<pre>
    [] == 0;
    Reflect.ownKeys(Array.prototype);
    Reflect.ownKeys(Object.prototype);
    [].valueOf();
    [].toString();

    a == 2 && a == 3;

    //1.valueOf toString同时存在且返回基本数据类型
    var obj = {valueOf: function(){return 1},toString: function(){return 2}}
    Number(obj) == 1;
    +obj == 1;
    String(obj) == 2;
    obj + 1;
    obj = {toString: function(){return null}}
    +obj
    String(obj)
    obj = {toString: function(){return undefined}}

    //2.valueOf toString同时存在且一个返回对象类型
    var obj = {valueOf: function(){return {}},toString: function(){return 2}}
    +obj;
    typeof +obj  //toString 可以返回数字类型（好多大佬表示很不爽）

    var obj = {valueOf: function(){return 1},toString: function(){return {}}}
    +obj;
    String(obj);

    //3.valueOf toString存在一个且返回对象类型
    obj = {toString: function(){return {}}}
    +obj;
    String(obj);

    //4.valueOf toString同时存在且都返回对象类型
    var obj = {valueOf: function(){return {}},toString: function(){return {}}}
    +obj;
    String(obj);

    //调用顺序 原型链查找
    var obj = {valueOf: function(){return null}}
    String(obj) //[object Object]
    //会不会调用valueOf方法
    var obj = Object.create(null);
    obj.valueOf = function(){return 2}
    String(obj) //'2'
</pre>

<em>caveat: Date对象是个例外</em>
<pre>
    Reflect.ownKeys(Date.prototype);
    new Date().valueOf()
    String(new Date());
    new Date() + 3;
</pre>

## Symbol.toPrimitive

The function is called with a string argument hint, which specifies the preferred type of the result primitive value. The hint argument can be one of "number", "string", and "default"

For objects, there’s no to-boolean conversion, because all objects are true in a boolean context. So there are only string and numeric conversions

<pre>
// An object without Symbol.toPrimitive property.
var obj1 = {};
console.log(+obj1);     // NaN
console.log(`${obj1}`); // "[object Object]"
console.log(obj1 + ''); // "[object Object]"

// An object with Symbol.toPrimitive property.
var obj2 = {
    [Symbol.toPrimitive](hint) {
        if (hint == 'number') {
            return 10;
        }
        if (hint == 'string') {
            return 'hello';
        }
        return true;
    }
};
console.log(+obj2);     // 10     -- hint is "number"
console.log(`${obj2}`); // "hello"-- hint is "string"
console.log(obj2 + ''); // "true" -- hint is "default"
</pre>

1. string
    > alert

    > String()

    > obj[key]


    <pre>
        var obj = {
            0: 'a',
            '1': 'b',
            length: 2
        }

        var obj1 = {a: 1};
        var obj2 = {a: 2};
        obj[obj1] = 'c';
        obj[obj2] = 'd';
        obj[obj1]
    </pre>
2. number
    > Number()

    > +obj

    > obj * 1

3. default

    Occurs in rare cases when the operator is “not sure” what type to expect

    >obj + 1

    >obj == 2

<em>总结：To do the conversion, JavaScript tries to find and call three object methods:</em>

1. Call obj[Symbol.toPrimitive] if the method exists
2. Otherwise if hint is "string"
try obj.toString() and obj.valueOf(), whatever exists.
3. Otherwise if hint is "number" or "default"
try obj.valueOf() and obj.toString(), whatever exists.

test
<pre>
    let user = {
        name: "John",
        money: 1000,

        [Symbol.toPrimitive](hint) {
            alert(`hint: ${hint}`);
            return hint == "string" ? `{name: "${this.name}"}` : this.money;
        }
    };

    alert(user); // hint: string -> {name: "John"}
    alert(+user); // hint: number -> 1000
    alert(user + 500); // hint: default -> 1500
</pre>

---
## Symbol.toStringTag
