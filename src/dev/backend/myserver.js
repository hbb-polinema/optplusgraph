var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
var PORT = 1337;

app.get('/', function(req, resp){
    console.log('get success');
    resp.sendFile('index.html', {root: path.join(__dirname, './')});
});

app.use(bodyParser());
app.post('/', function(req, resp){
    console.log('req: '+ req + 'resp: ' + resp);
    resp.end(JSON.stringify(req.body.userCode));
    console.log('userCode: ' + req.body.userCode);
});

app.listen(PORT, function(){
    console.log('listening localhost on port ' + PORT);
});