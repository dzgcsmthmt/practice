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
## Symbol.toPrimitive
<pre>
    0 == []
    false == []
    '' == []
    [] == ![]
    [] + []
    {} + {}
    [] + {}
    {} + []
    (!+[]+[]+![]).length
</pre>

??? toPrimitive ??? 一脸懵逼.png

参考：[ECMAScript-262 edition 3](https://www.ecma-international.org/ecma-262/6.0/index.html#sec-toprimitive)

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

#### Symbol.toPrimitive

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

    > obj * 1 /1 ~~

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

<pre>
    ({}).toString.call({});
    ({}).toString.call([]);
    ({}).toString.call(1);
    ({}).toString.call(new Number(1));
    ({}).toString.call(document.createElement('span'));
    class ValidatorClass {}
    ({}).toString.call(new ValidatorClass());
</pre>

The Symbol.toStringTag well-known symbol is a string valued property that is used in the creation of the default string description of an object. It is accessed internally by the Object.prototype.toString() method

<pre>
    class ValidatorClass {
        get [Symbol.toStringTag]() {
            return 'Validator';
        }
    }
    ({}).toString.call(new ValidatorClass());

    var obj = {
    	get [Symbol.toStringTag](){
    		return 'foo';
    	}
    }
    ({}).toString.call(obj);
</pre>

---
## instanceOf

<pre>
    new String('a') instanceof String

    function Foo(){}
    var foo = new Foo();
    console.log(foo instanceof Foo)

    function Aoo(){}
    function Foo(){}
    Foo.prototype = new Aoo();
    var foo = new Foo();
    console.log(foo instanceof Foo)
    console.log(foo instanceof Aoo)

    //精彩的来了
    console.log(Object instanceof Object);//true
    console.log(Function instanceof Function);//true
    console.log(Number instanceof Number);//false
    console.log(String instanceof String);//false

    console.log(Function instanceof Object);//true

    console.log(Foo instanceof Function);//true
    console.log(Foo instanceof Foo);//false

</pre>

ECMAScript-262 edition 3 中instanceof 运算符的定义

11.8.6 The instanceof operator<br />
The production RelationalExpression:<br />
RelationalExpression instanceof ShiftExpression is evaluated as follows:

 1. Evaluate RelationalExpression.
 2. Call GetValue(Result(1)).
 3. Evaluate ShiftExpression.
 4. Call GetValue(Result(3)).
 5. If Result(4) is not an object, throw a TypeError exception.
 6. If Result(4) does not have a [[HasInstance]] method,throw a TypeError exception.
 7. Call the [[HasInstance]] method of Result(4) with parameter Result(2).
 8. Return Result(7).

15.3.5.3 [[HasInstance]] (V)<br/>
Assume F is a Function object.<br/>
When the [[HasInstance]] method of F is called with value V,the following steps are taken:

 1. If V is not an object, return false.
 2. Call the [[Get]] method of F with property name "prototype".
 3. Let O be Result(2).
 4. If O is not an object, throw a TypeError exception.
 5. Let V be the value of the [[Prototype]] property of V.//V = V.[[Prototype]]
 6. If V is null, return false.
 7. If O and V refer to the same object or if they refer to objects joined to each other (section 13.1.2), return true.
 8. Go to step 5.

翻译成JavaScript 代码
<pre>
    function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
        var O = R.prototype;// 取 R 的显示原型
        L = L.__proto__;// 取 L 的隐式原型
        while (true) {
            if (L === null)
                return false;
            if (O === L)// 这里重点：当 O 严格等于 L 时，返回 true
                return true;
            L = L.__proto__;
        }
    }

    Object instanceof Object
    // 为了方便表述，首先区分左侧表达式和右侧表达式
    ObjectL = Object, ObjectR = Object;
    // 下面根据规范逐步推演
    O = ObjectR.prototype = Object.prototype
    L = ObjectL.__proto__ = Function.prototype
    // 第一次判断
    O != L
    // 循环查找 L 是否还有 __proto__
    L = Function.prototype.__proto__ = Object.prototype
    // 第二次判断
    O == L
    // 返回 true

    Function instanceof Function
    // 为了方便表述，首先区分左侧表达式和右侧表达式
    FunctionL = Function, FunctionR = Function;
    // 下面根据规范逐步推演
    O = FunctionR.prototype = Function.prototype
    L = FunctionL.__proto__ = Function.prototype
    // 第一次判断
    O == L
    // 返回 true

    Foo instanceof Foo
    // 为了方便表述，首先区分左侧表达式和右侧表达式
    FooL = Foo, FooR = Foo;
    // 下面根据规范逐步推演
    O = FooR.prototype = Foo.prototype
    L = FooL.__proto__ = Function.prototype
    // 第一次判断
    O != L
    // 循环再次查找 L 是否还有 __proto__
    L = Function.prototype.__proto__ = Object.prototype
    // 第二次判断
    O != L
    // 再次循环查找 L 是否还有 __proto__
    L = Object.prototype.__proto__ = null
    // 第三次判断
    L == null
    // 返回 false
</pre>

---
## Symbol.HasInstance

The Symbol.hasInstance well-known symbol is used to determine if a constructor object recognizes an object as its instance. The instanceof operator's behavior can be customized by this symbol.

<pre>
class Array1 {
    static [Symbol.hasInstance](instance) {
        return Array.isArray(instance);
    }
}

console.log([] instanceof Array1);

class MyObject{
	static [Symbol.hasInstance](instance){
		return ({}).toString.call(instance) == '[object Object]';
	}
}

</pre>

---
## Symbol.species
The well-known symbol Symbol.species specifies a function-valued property that the constructor function uses to create derived objects
<pre>
class Array1 extends Array {
    static get [Symbol.species]() { return Array; }
}

const a = new Array1(1, 2, 3);
const mapped = a.map(x => x * x);

console.log(mapped instanceof Array1);
// expected output: false

console.log(mapped instanceof Array);
// expected output: true
</pre>

---
## Symbol.iterator
The Symbol.iterator well-known symbol specifies the default iterator for an object. Used by for...of.

<pre>
var iter = 'abc'[Symbol.iterator]();
iter = [1,2,3][Symbol.iterator]();
iter = new Set([1,2,3])[Symbol.iterator]();

function getIterableObj(obj){
    var iter = Object.values(obj)[Symbol.iterator]();
    return {
        [Symbol.iterator](){
            return this;
        },
        next(){
            let {value,done} = iter.next();
            return {value,done};
        }
    }
}

var obj = {a: 1,b: 2};
obj = getIterableObj(obj);
for(var val of obj){
	console.log(val)
}

</pre>
