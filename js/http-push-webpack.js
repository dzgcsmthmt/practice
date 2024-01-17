/**
 * @author nuer
 * @time 20180409
 */

 'use strict'

 const Url = require('url')
 const path = require('path')
 const ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers')
 const fs = require('fs')

 function forEachMap(obj, callback, merge) {
     let index = 0
     for (let key in obj) {
         if (obj.hasOwnProperty(key)) {
             if (merge) {
                 callback[key] = obj[key]
             } else if (callback(key, obj[key], index++)) {
                 break
             }
         }
     }
 }

 function parseUrl(url, opt) {
     opt = opt || {}
     url = Url.parse(url)
     const ssl = url.protocol === 'https:'
     opt.host =
         opt.host ||
         opt.hostname ||
         (ssl || url.protocol === 'http:' ? url.hostname : 'localhost')
     opt.port = opt.port || url.port || (ssl ? 443 : 80)
     opt.path = opt.path || url.pathname + (url.search ? url.search : '')
     opt.method = opt.method || 'GET'
     opt.agent = opt.agent || false
     return opt
 }

 /**
  * 异步循环;
  * @param {Array}   array     数组
  * @param {Function} callback 全部执行完毕后回调
  */
 function Queue(array, callback) {
     const self = array.shift()

     if (undefined === self) {
         callback()
     } else {
         self(() => Queue(array, callback))
     }
 }

 class HttpPush {
     constructor(options) {
         this.options = options
     }

     apply(compiler) {
         if (compiler.hooks) {
             compiler.hooks.afterEmit.tapAsync(
                 'HttpPush',
                 (compilation, callback) => {
                     const assets = compilation.assets;
                     let cacheDirPath = path.resolve(__dirname,'../node_modules/.pushcach');
                     let cachefilePath = path.join(cacheDirPath,'/dir.json');
                     //跟上一次push做一次diff，只push更改的文件
                     //代码写的自己都感觉恶心，node文件操作实在是太不熟了，只能照着api凑合一下
                     fs.stat(cachefilePath,(err) => {
                         if(err){
                             let map = {};
                             Object.keys(assets).forEach(name => {
                                 map[name] = 1;
                             });
                             fs.mkdir(cacheDirPath,{ recursive: true },(err) => {
                                 if(err){
                                     throw err;
                                 }else{
                                     fs.writeFile(cachefilePath,JSON.stringify(map,null,4),(err) => {
                                         if (err) throw err;
                                         this.enqueue(assets,callback);
                                     });
                                 }
                             })
                         }else{
                             fs.readFile(cachefilePath,(err,data) => {
                                 if (err) throw err;
                                 let prevAsset = JSON.parse(data.toString());
                                 let changedAsset = {};
                                 Object.keys(assets).forEach(name => {
                                     if(name.match(/\.(vm|html)$/)){
                                         changedAsset[name] = assets[name];
                                     }else{
                                         if(!prevAsset[name]){
                                             changedAsset[name] = assets[name];
                                         }
                                     }
                                 });
                                 if(Object.keys(changedAsset).length){
                                     this.enqueue(changedAsset,callback);
                                     let map = {};
                                     Object.keys(assets).forEach(name => {
                                         map[name] = 1;
                                     });
                                     fs.writeFileSync(cachefilePath,JSON.stringify(map,null,4));
                                 }
                             });
                         }
                     })

                 }
             )
         }
     }

     enqueue(assets,callback) {
         const {
             receiver,
             to,
             data = {},
             include = [],
             exclude = [],
         } = this.options
         let steps = []
         Object.keys(assets).forEach(name => {
             if (
                 !ModuleFilenameHelpers.matchObject(
                     { include: include, exclude: exclude },
                     name
                 )
             )
                 return false

             steps.push(next => {
                 data['to'] = this.processPath(path.join(to, name));
                 const contentPath = path.join('dist', name)
                 const content = fs.readFileSync(contentPath)
                 this.upload(
                     receiver,
                     null,
                     data,
                     content,
                     name,
                     err => {
                         if (err) {
                             throw new Error(err)
                         } else {
                             console.log(
                                 `[HTTP-PUSH] from ${name} to ${data['to']} [ok]`
                             )
                             next()
                         }
                     }
                 )
             })
         })
         Queue(steps, callback)
     }

     upload(url, opt, data, content, subpath, callback) {
         if (typeof content === 'string') {
             content = new Buffer(content, 'utf8')
         } else if (!(content instanceof Buffer)) {
             console.error('unable to upload content [%s]', typeof content)
         }
         opt = opt || {}
         data = data || {}
         const endl = '\r\n'
         const boundary = '-----np' + Math.random()
         let collect = []
         forEachMap(data, (key, value) => {
             collect.push(`--${boundary}${endl}`)
             collect.push(`Content-Disposition: form-data; name="${key}"${endl}`)
             collect.push(endl)
             collect.push(value + endl)
         })
         collect.push(`--${boundary}${endl}`)
         collect.push(
             `Content-Disposition: form-data; name="${opt.uploadField ||
                 'file'}"; filename="${subpath}"${endl}`
         )
         collect.push(endl)
         collect.push(content)
         collect.push(endl)
         collect.push(`--${boundary}--${endl}`)

         let length = 0
         collect.forEach(ele => {
             if (typeof ele === 'string') {
                 length += new Buffer(ele).length
             } else {
                 length += ele.length
             }
         })

         opt.method = opt.method || 'POST'
         opt.headers = Object.assign(
             {
                 'Content-Type': 'multipart/form-data; boundary=' + boundary,
                 'Content-Length': length,
             },
             opt.headers || {}
         )
         opt = parseUrl(url, opt)
         const http =
             opt.protocol === 'https:' ? require('https') : require('http')
         const req = http.request(opt, function(res) {
             const status = res.statusCode
             let body = ''
             res.on('data', chunk => (body += chunk))
                 .on('end', () => {
                     if ((status >= 200 && status < 300) || status === 304) {
                         callback(null, body)
                     } else {
                         callback(status)
                     }
                 })
                 .on('error', err => callback(err.message || err))
         })
         collect.forEach(d => req.write(d))
         req.end()
     }

     processPath(str){
         str = path.normalize(str.replace(/[\/\\]+/g, '/')).replace(/\\/g, '/');
         if (str !== '/') {
             str = str.replace(/\/$/, '');
         }
         return str;
     }
 }

 module.exports = HttpPush
