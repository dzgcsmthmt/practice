## Array.prototype.sort
>Array中的元素必须实现Comparable接口，js中默认使用字符串比较，所以会认为2>10；

>sort要实现Comparator接口，提供compare方法，sort中的回调函数就是一个compare的实现，也是策略模式的一个应用

## String.prototype.indexOf
>indexOf 使用Boyer-Moore算法，这种匹配算法还有kmp，Rabin-Karp算法
[参考](https://www.hongweipeng.com/index.php/archives/1612/)
[Bm](https://www.youtube.com/watch?v=ZMQWjslBlbU)
[Kmp](https://www.youtube.com/watch?v=GTJr8OvyEVQ)
