/*
    RUN:
    node myserver.js
*/

var express = require('express');
var path = require('path');
//var fs = require('fs');

var APP = express();
var PORT = 1337;

APP.get('/', function(req, resp){
    console.log('get success');
    resp.sendFile('tree.html', {root: path.join(__dirname, './')});
});

APP.listen(PORT, function(){
    console.log('listening localhost on port ' + PORT);
});