

var url = 'http://mylogger.io/log';
const EventEmitter = require('events')


class Logger extends EventEmitter {

 log(message) {

        //send http request

    console.log(message)

    //Raise an event
    this.emit('MessageLogged', { id: 1, url: 'http://' + url });

}

}

module.exports = Logger;

//module.exports.endpoint = url;