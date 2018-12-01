## 第一章 Loading and Execution 加载和运行 ##
* 将所有script标签放在页面的底部，body标签之前，此方法可以保证页面在脚本运行之前完成解析
* 将脚本成组打包，页面的script标签越少，页面的加载速度就越来，相应也越快
* 有几种方式可以使用非阻塞的加载js脚本

>1. defer
>>IE 4+   defer downloads the file during HTML parsing and will only execute it after the parser has completed. defer scripts are also guarenteed to execute in the order that they appear in the document. but actually the order can not be guarenteed in IE9-
>2. async    
>>IE10+   async downloads the file during HTML parsing and will pause the HTML parser to execute it when it has finished downloading.no order guarenteed
>3. lazy loading
>>create js dynamically and append to head
>>>IE onstatechange  readyState='loaded' || 'complete' !IE onload
>4. xhr  
>>use XHRHttprequest --jquery.load()

***
## 第二章 Date Access 数据访问 ##
* Literal values and local variables can be accessed very quickly, whereas array items and object members take longer.
* Local variables are faster to access than out-of-scope variables because they exist in the first variable object of the scope chain. The further into the scope chain a variable is, the longer it takes to access. Global variables are always the slowest to access because they are always last in the scope chain.
*  Avoid the with statement because it augments the execution context scope chain. Also, be careful with the catch clause of a try-catch statement because it has the same effect.
* Nested object members incur significant performance impact and should be minimized.
* The deeper into the prototype chain that a property or method exists, the slower it is to access.
* Generally speaking, you can improve the performance of JavaScript code by storing frequently used object members, array items, and out-of-scope variables in local variables. You can then access the local variables faster than the originals.

***
## 第三章 DOM Scripting DOM 编程 ##
* Minimize DOM access, and try to work as much as possible in JavaScript.
* Use local variables to store DOM references you'll access repeatedly.
* Be careful when dealing with HTML collections because they represent the live, underlying document. Cache the collection length into a variable and use it when iterating, and make a copy of the collection into an array for heavy work on collections.
* Use faster APIs when available, such as querySelectorAll() and firstElementChild,Xpath is preferable
* Be mindful of repaints and reflows; batch style changes, manipulate the DOM tree "offline," and cache and minimize access to layout information.
* Position absolutely during animations, and use drag and drop proxies.
* Use event delegation to minimize the number of event handlers.

***
## 第四章 Algorithm and Flow Control  算法和流程控制 ##
* The for, while, and do-while loops all have similar performance characteristics, and so no one loop type is significantly faster or slower than the others.
* Avoid the for-in loop unless you need to iterate over a number of unknown object properties.
* The best ways to improve loop performance are to decrease the amount of work done per iteration and decrease the number of loop iterations.
* Generally speaking, switch is always faster than if-else, but isnt always the best solution.
* Lookup tables are a faster alternative to multiple condition evaluation using if-else or switch.i like this one
* Browser call stack size limits the amount of recursion that JavaScript is allowed to perform; stack overflow errors prevent the rest of the code from executing
* If you run into a stack overflow error, change the method to an iterative algorithm or make use of memoization to avoid work repetition.
* The larger the amount of code being executed, the larger the performance gain realized from using these strategies.

***
## 第五章 String and Regular Expression 字符串和正则表达式 ##
* When concatenating numerous or large strings, array joining is the only method with reasonable performance in IE7 and earlier.
* If you don't need to worry about IE7 and earlier, array joining is one of the slowest ways to concatenate strings.Use simple + and += operators instead, and avoid unnecessary intermediate strings.

>there are 4 string concatenate methods
>>1. the + operator  str = str + str1 + str2 faster than str += str + str2 because the second statement will create a temparory string. not for IE
>>2. the += operator
>>3. array.join()   for IE7-
>>4. string.concat()    slow in IE Chrome and Opera

***
## 第六章 Responsive Interfaces 响应接口 ##
* No JavaScript task should take longer than 100 milliseconds to execute. Longer execution times cause a noticeable delay in updates to the UI and negatively impact the overall user experience.
* Browsers behave differently in response to user interaction during JavaScript execution. Regardless of the behavior, the user experience becomes confusing and disjointed when JavaScript takes a long time to execute.
* Timers can be used to schedule code for later execution, which allows you to split up long-running scripts into a series of smaller tasks.
* Web workers are a feature in newer browsers that allow you to execute JavaScript code outside of the UI thread, thus preventing UI locking.
* The more complex the web application, the more critical it is to manage the UI thread in a proactive manner.No JavaScript code is so important that it should adversely affect the user's experience.

***
## 第七章 Ajax ##
* As data formats, plain text and HTML are highly situational, but they can save CPU cycles on the client side.XML is widely available and supported almost everywhere, but it is extremely verbose and slow to parse. JSON is lightweight and quick to parse (when treated as native code and not a string), and almost as interoperable as XML.Character-delimited custom formats are extremely lightweight and the quickest to parse for large datasets, but may take additional programming effort to format on the server side and parse on the client side.
>1. XML&HTML download time and parse both slow
>2. JSON  faster download time and parse time than XML
>3. JSONP same download time but faster parse time than JSON
>4. custom formatting lightweight and the quickest to parse

* When requesting data, XHR gives you the most control and flexibility when pulling from the page's domain,though it treats all incoming data as a string, potentially slowing down the parse times. Dynamic script tag insertion, on the other hand, allows for cross-domain requests and native execution of JavaScript and JSON,though it offers a less robust interface and cannot read headers or response codes. Multipart XHR can be used to reduce the number of requests, and can handle different file types in a single response, though it does not cache the resources received. When sending data, image beacons are a simple and efficient approach. XHR can also be used to send large amounts of data in a POST.

#### In addition to these formats and transmission techniques, there are several guidelines that will help your Ajax appear to be faster: ####

* Reduce the number of requests you make, either by concatenating JavaScript and CSS files, or by using MXHR.
* Improve the perceived loading time of your page by using Ajax to fetch less important files after the rest of the page has loaded.
* Ensure your code fails gracefully and can handle problems on the server side.
* Know when to use a robust Ajax library and when to write your own low-level Ajax code.

***
## 第八章 Programming Practices 编程实践 ##
* Avoid Double Evaluation
>JavaScript, like many scripting languages, allows you to take a string containing code and execute it from within running code. There are four standard ways to accomplish this: eval_r(), the Function() constructor,setTimeout(), and setInterval(). Each of these functions allows you to pass in a string of JavaScript code and have it executed.

* Use Object/Array Literals
>There are multiple ways to create objects and arrays in JavaScript, but nothing is faster than creating object and array literals.
<pre>
    var a = new Array();
    a[0] = 77;   // Allocates
    a[1] = 88;
    a[2] = 0.5;   // Allocates, converts
    a[3] = true; // Allocates, converts
    var a = [77, 88, 0.5, true];
because in the first example the individual assignments are performed one after another, and the assignment of a[2] causes the Array to be converted to an Array of unboxed doubles, but then the assignment of a[3] causes it to be re-converted back to an Array that can contain any values (Numbers or objects). In the second case, the compiler knows the types of all of the elements in the literal, and the hidden class can be determined up front.
</pre>
* Don't Repeat Work
>1. Lazy Loading
<pre>
function addHandler(target, eventType, handler){
    if (target.addEventListener){ //DOM2 Events
        addHandler = function(target, eventType, handler){  //执行时判断，再赋值
            target.addEventListener(eventType, handler, false);
        };
    }
}
</pre>
>2. Conditional Advance Loading
<pre>
    var addHandler = document.body.addEventListener ?   //先判断再赋值
        function(target, eventType, handler){
            target.addEventListener(eventType, handler, false);
        } :
        function(target, eventType, handler){
            target.attachEvent("on" + eventType, handler);
        };
</pre>

* Use the Fast Parts
>1. Bitwise Operators
>2. Native Methods
>3. Primitive operations can be faster than function calls var min = a < b ? a : b; > var min = Math.min(a,b);
