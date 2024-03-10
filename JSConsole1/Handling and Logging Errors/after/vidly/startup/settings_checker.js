const config = require('config')
const { logger } = require('./winston')

module.exports = function () {

    process.on('uncaughtExeption', (ex) => {

    logger.error(ex)
    process.exit(1)

});

process.on('unhandledRejection', (ex) => {



    logger.error( ex.message)
    process.exit(1)
})

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}


}