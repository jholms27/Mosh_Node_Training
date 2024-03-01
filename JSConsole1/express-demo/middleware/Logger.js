//app.use(function (req, res, next) {

//    console.log('Logging...')
//    next();
//})


function log (req, res, next) {

    console.log('Logging...')
    next();
};


module.exports = log