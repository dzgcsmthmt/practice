var express = require('express')
var app = express();
var WebSocket = require('ws');
var wss = new WebSocket.Server({port: 3000});

wss.on('connection',function(ws){
    ws.on('message',function(msg){
        console.log(msg);
        ws.send('hi,老伙计')
    })
})
