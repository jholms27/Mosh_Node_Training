const winston = require('winston')
require('winston-mongodb')


const logger = winston.createLogger({

    level: 'error',
    format: winston.format.json(),
    transports: [

        new winston.transports.MongoDB({

            db: 'mongodb://localhost/vidly',
            level: 'error'
        }),
        new winston.transports.File({ filename: 'error.log' })
    ],
    defaultMeta: { service: 'user-service' }
})

module.exports.logger = logger