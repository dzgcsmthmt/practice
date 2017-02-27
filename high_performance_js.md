## 第一章 Loading and Execution 加载和运行 ##
>将所有script标签放在页面的底部，body标签之前，此方法可以保证页面在脚本运行之前完成解析
>
>将脚本成组打包，页面的script标签越少，页面的加载速度就越来，相应也越快
>
>有几种方式可以使用非阻塞的加载js脚本
>
1. defer
>>IE 4+   defer downloads the file during HTML parsing and will only execute it after the parser has completed. defer scripts are also guarenteed to execute in the order that they appear in the document. but actually the order can not be guarenteed in IE9-
2. async    
>>IE10+   async downloads the file during HTML parsing and will pause the HTML parser to execute it when it has finished downloading.no order guarenteed
3. lazy loading
>>create js dynamically and append to head
>>>IE onstatechange  readyState='loaded' || 'complete' !IE onload
4. xhr  
>>use XHRHttprequest --jquery.load()

***
## Date Access 数据访问 ##
