var express = require('express')
var app = express();
var whiteList = ['http://localhost:3000']
app.use(function(req,res,next){
    console.log(req.headers);
    let origin = req.headers.origin;
    if(whiteList.includes(origin)){
        res.setHeader('Access-Control-Allow-Origin',origin);
        res.setHeader('Access-Control-Allow-Headers','name,cookie');
        res.setHeader('Access-Control-Allow-Methods','PUT');
        res.setHeader('Access-Control-Allow-Credentials',true);
        res.setHeader('Access-Control-Max-Age',6000);
    };
    next();
});

app.get('/search',function(req,res){
    console.log(req.query);
    var cbName = req.query.cb;
    res.send([{n:1,d:2},{n:2,d:3}]);
})

app.post('/search',function(req,res){
    console.log(req.query);
    var cbName = req.query.cb;
    res.send([{n:1,d:2},{n:2,d:3}]);
})

app.listen('8888');