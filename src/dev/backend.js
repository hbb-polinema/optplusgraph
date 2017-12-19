// This is a nodejs server based on express that serves the v4-cokapi/ app,
// which implements OPT language backends for languages such as Java,
// Ruby, JavaScript, TypeScript, C, C++, ...

// To test locally, run 'make' and load http://localhost:3000/

// Run with an 'https' command-line flag to use https (must have
// the proper certificate and key files, though)

var IS_DEBUG = true;

var PRODUCTION_PORT = 3000;
var PRODUCTION_HTTPS_PORT = 8001;
var DEBUG_PORT = 5001;

var assert = require('assert');
var child_process = require('child_process');
var express = require('express');
var util = require('util');

// We use this to execute since it supports utf8 and also an optional
// timeout, but it needs the exact location of binaries because it doesn't
// spawn a shell
// http://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback

var TIMEOUT_SECS = 60;
var MAX_BUFFER_SIZE = 15 * 1024 * 1024; // Byte
var MEM_LIMIT = "1024M"; // 1 GB

// bind() res and useJSONP before using
function postExecHandler(res, useJSONP, err, stdout, stderr) {
    var errTrace;
    if (err) {
        console.log('postExecHandler', util.inspect(err, { depth: null }));
        if (err.killed) {
            // timeout!
            errTrace = {
                code: '',
                trace: [{
                    'event': 'uncaught_exception',
                    'exception_msg': 'Error: Your code ran for more than ' + TIMEOUT_SECS + ' seconds.\nThe server may be overloaded right now.\nPlease try again later, or shorten your code.'
                }]
            };
            if (useJSONP) {
                res.jsonp(errTrace /* return an actual object, not a string */ );
            } else {
                res.send(JSON.stringify(errTrace));
            }
        } else {
            if (err.code === 42) {
                // special error code for instruction_limit_reached in jslogger.js
                errTrace = {
                    code: '',
                    trace: [{
                        'event': 'uncaught_exception',
                        'exception_msg': 'Error: stopped after running 1000 steps and cannot display visualization.\nShorten your code, since Python Tutor is not designed to handle long-running code.'
                    }]
                };
            } else {
                errTrace = {
                    code: '',
                    trace: [{
                        'event': 'uncaught_exception',
                        'exception_msg': "Unknown error. The server may be down or overloaded right now.\nReport a bug to 23515043@std.stei.itb.ac.id by clicking on the\n'Generate permanent link' button at the bottom and including a URL in your email."
                    }]
                };
            }

            if (useJSONP) {
                res.jsonp(errTrace /* return an actual object, not a string */ );
            } else {
                res.send(JSON.stringify(errTrace));
            }
        }
    } else {
        if (useJSONP) {
            try {
                // stdout better be real JSON, or we've got a problem!!!
                var stdoutParsed = JSON.parse(stdout);
                res.jsonp(stdoutParsed /* return an actual object, not a string */ );
            } catch (e) {
                errTrace = {
                    code: '',
                    trace: [{
                        'event': 'uncaught_exception',
                        'exception_msg': "Unknown error. The server may be down or overloaded right now.\nReport a bug to 23515043@std.stei.itb.ac.id by clicking on the\n'Generate permanent link' button at the bottom and including a URL in your email."
                    }]
                };
                res.jsonp(errTrace /* return an actual object, not a string */ );
            }
        } else {
            res.send(stdout);
        }
    }
}

var app = express();

// http://ilee.co.uk/jsonp-in-express-nodejs/
app.set("jsonp callback", true);

app.get('/exec_js', exec_js_handler.bind(null, false, false));
app.get('/exec_js_jsonp', exec_js_handler.bind(null, true, false));

app.get('/exec_ts', exec_js_handler.bind(null, false, true));
app.get('/exec_ts_jsonp', exec_js_handler.bind(null, true, true));

function exec_js_handler(useJSONP /* use bind first */ , isTypescript /* use bind first */ , req, res) {
    var usrCod = req.query.user_script;
    var exeFile;
    var args = [];

    // must match the docker setup in backends/javascript/Dockerfile
    exeFile = '/usr/bin/docker'; // absolute path to docker executable
    args.push('run', '-m', MEM_LIMIT, '--rm', '--user=netuser', '--net=none', '--cap-drop', 'all', 'pgbovine/cokapi-js:v1',
        '/tmp/javascript/node-v6.0.0-linux-x64/bin/node', // custom Node.js version
        '--expose-debug-as=Debug',
        '/tmp/javascript/jslogger.js');

    if (isTypescript) {
        args.push('--typescript=true');
    }
    args.push('--jsondump=true');
    args.push('--code=' + usrCod);

    child_process.execFile(exeFile, args, {
            timeout: TIMEOUT_SECS * 1000 /* milliseconds */ ,
            maxBuffer: MAX_BUFFER_SIZE,
            // make SURE docker gets the kill signal;
            // this signal seems to allow docker to clean
            // up after itself to --rm the container, but
            // double-check with 'docker ps -a'
            killSignal: 'SIGINT'
        },
        postExecHandler.bind(null, res, useJSONP));
}

app.get('/exec_java', exec_java_handler.bind(null, false));
app.get('/exec_java_jsonp', exec_java_handler.bind(null, true));

// runs David Pritchard's Java backend in backends/java/
function exec_java_handler(useJSONP /* use bind first */ , req, res) {
    var usrCod = req.query.user_script;

    var parsedOptions = JSON.parse(req.query.options_json);
    var heapPrimitives = parsedOptions.heap_primitives;

    var exeFile;
    var args = [];

    var inputObj = {};
    inputObj.usercode = usrCod;
    // TODO: add options, arg, and stdin later ...
    inputObj.options = {};
    inputObj.args = [];
    inputObj.stdin = "";

    // VERY unintuitive -- to get strings to display as heap objects and
    // NOT 'primitive' values in the Java backend, set showStringsAsValues
    // to false
    if (heapPrimitives) {
        inputObj.options.showStringsAsValues = false;
    }

    var inputObjJSON = JSON.stringify(inputObj);

    // must match the docker setup in backends/java/Dockerfile
    exeFile = '/usr/bin/docker'; // absolute path to docker executable
    args.push('run', '-m', MEM_LIMIT, '--rm', '--user=netuser', '--net=none', '--cap-drop', 'all', 'pgbovine/cokapi-java:v1',
        '/tmp/run-java-backend.sh',
        inputObjJSON);

    child_process.execFile(exeFile, args, {
            timeout: TIMEOUT_SECS * 1000 /* milliseconds */ ,
            maxBuffer: MAX_BUFFER_SIZE,
            // make SURE docker gets the kill signal;
            // this signal seems to allow docker to clean
            // up after itself to --rm the container, but
            // double-check with 'docker ps -a'
            killSignal: 'SIGINT'
        },
        postExecHandler.bind(null, res, useJSONP));
}

app.get('/exec_ruby', exec_ruby_handler.bind(null, false));
app.get('/exec_ruby_jsonp', exec_ruby_handler.bind(null, true));

function exec_ruby_handler(useJSONP /* use bind first */ , req, res) {
    var usrCod = req.query.user_script;

    var exeFile;
    var args = [];

    // must match the docker setup in backends/ruby/Dockerfile
    exeFile = '/usr/bin/docker'; // absolute path to docker executable
    args.push('run', '-m', MEM_LIMIT, '--rm', '--user=netuser', '--net=none', '--cap-drop', 'all', 'pgbovine/cokapi-ruby:v1',
        '/tmp/ruby/ruby',
        '/tmp/ruby/pg_logger.rb',
        '-c',
        usrCod);

    child_process.execFile(exeFile, args, {
            timeout: TIMEOUT_SECS * 1000 /* milliseconds */ ,
            maxBuffer: MAX_BUFFER_SIZE,
            // make SURE docker gets the kill signal;
            // this signal seems to allow docker to clean
            // up after itself to --rm the container, but
            // double-check with 'docker ps -a'
            killSignal: 'SIGINT'
        },
        postExecHandler.bind(null, res, useJSONP));
}

app.get('/exec_c', exec_cpp_handler.bind(null, false, false));
app.get('/exec_c_jsonp', exec_cpp_handler.bind(null, false, true));
app.get('/exec_cpp', exec_cpp_handler.bind(null, true, false));
app.get('/exec_cpp_jsonp', exec_cpp_handler.bind(null, true, true));

function exec_cpp_handler(useCPP /* use bind first */ , useJSONP /* use bind first */ , req, res) {
    var code = req.query.user_script;
    console.log('\n----\nUser_Code: <length:' + code.length + '>\n');
    var exeFile;
    var args = [];

    // this needs to match the docker setup in opt-cpp-backend/Dockerfile (in the https://github.com/pgbovine/opt-cpp-backend repo)
    /**
     * NOTE MANUALLY for Development only! author by habibieeddien
     * Stop or remove all Docker containers
     * `docker stop $(docker ps -a -q)`
     * `docker rm $(docker ps -a -q)`
     * 
     * Run a command in a running container
     * https://docs.docker.com/engine/reference/commandline/exec/
     * 
     * Make sure had to run image: docker run --name backend -it -d <image_ID> bash
     * Make sure had to start container: docker start <container>
     */
    exeFile = '/usr/bin/docker'; // absolute path to docker executable
    args.push('run', '--memory', MEM_LIMIT, '--rm', '--cap-drop', 'all', 'habibieeddien:c_cpp_backend', // now, it will auto-run image (commit by habibieeddien) to container and auto-remove after exec
        'python',
        '/tmp/opt-cpp-backend/run_cpp_backend.py',
        code,
        useCPP ? 'cpp' : 'c');

    child_process.execFile(exeFile, args, {
            timeout: TIMEOUT_SECS * 1000 /* milliseconds */ ,
            maxBuffer: MAX_BUFFER_SIZE,
            // make SURE docker gets the kill signal;
            // this signal seems to allow docker to clean
            // up after itself to --rm the container, but
            // double-check with 'docker ps -a'
            killSignal: 'SIGINT'
        },
        postExecHandler.bind(null, res, useJSONP));
}

// https support
//var https = require('https');
//var fs = require('fs');

// obsolete as of 2017-06-28
/*
by habibieeddien
Don't need cause has no certified
var options = {
  key: fs.readFileSync('cokapi.com.key'),
  cert: fs.readFileSync('cokapi.com-BUNDLE.crt')
};
*/

/*/ added letsencrypt support on 2017-06-28 -- MAKE SURE we have read permissions
var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/cokapi.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/cokapi.com/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/cokapi.com/chain.pem')
};*/

/*var args = process.argv.slice(2);
if (args.length > 0 && args[0] === 'https') {
  var server = https.createServer(options, app).listen(
    IS_DEBUG ? DEBUG_PORT : PRODUCTION_HTTPS_PORT,
    function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log('https app listening at http://%s:%s', host, port);
    });
} else {*/
var server = app.listen(
    IS_DEBUG ? DEBUG_PORT : PRODUCTION_PORT,
    function() {
        var host = server.address().address;
        var port = server.address().port;
        console.log('http app listening at http://%s:%s', host, port);
    });
//}