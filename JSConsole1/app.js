'use strict';

//function sayHello(name) {

//        console.log('hello' + ' ' + name)

//}

//sayHello('Jason');

////console.log('Hello world');

//var s = 'I am learning Web Dev'

//var s_split = s.split(' ')

//var s_0index = s_split[1]

//var s_0of0index = s_0index[0]

////var s_slice = s.slice(1)

//console.log(s_0of0index)

////var s_map = s_split.map(s=> s[0].toUpperCase() + s.slice(1).toLowerCase())

////var s_join = s_map.join(' ')


////console.log(s_join)

//console.log(false || 'string')

//console.log(); //global

//setTimeout()

//clearTimeout()

//setInterval()

//clearInterval()

//window.console.log()

//window.setTimeout()

//var message = '';

//global.console.log

//console.log(global.message)

//var logger = require('./logger.js')

//logger('message')


//const path = require('path')

//var pathObj = path.parse(__filename);

//console.log(pathObj)

//const operatingSystem = require('os')

//var totalMemory = operatingSystem.totalmem()

//console.log('Total Memory: ' + totalMemory)

//const fs = require('fs')

//var FS = fs.readdir('$', function (err, files) {

//    if (err) console.log('Error', err);
//    else console.log('Result',files)

//})

//console.log(FS)

//const Logger = require('./logger')



//const EventEmitter = require('events')





////emitter.addlistener('MessageLogged',  (_arg) => {

////    console.log('listener',_arg);

////});

//const logger = new Logger()

//    // Register a listener
//logger.on('MessageLogged', (_arg) => {

//    console.log('Listener actuated', _arg)

//})

//logger.log('message')

////Raise an event
//emitter.emit('MessageLogged', {id:1 ,url: 'http://'}); // make a noise or do something when something happens.


//const http = require('http')

//const server = http.createServer(function (req, res) {

//    if (req.url === '/') {

//        res.write('Hello World')
//        res.end();

//    }

//})
//server.on('connection', (socket) => {

//        console.log('New Connection....')

//})

//server.listen(3000);

//console.log('Listening on port 3000....')
const Event = require('events')

var emitter = new Event()

emitter