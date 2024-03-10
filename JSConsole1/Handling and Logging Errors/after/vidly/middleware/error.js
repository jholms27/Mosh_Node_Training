const express = require('express')
//const mongoose = require('mongoose')
const { logger } = require('../startup/winston')




//const p = promise.reject(new Error('Promise Rejection'))
//p.then()
module.exports.errorHandler =  function (err, req, res, next) {

    //console.log(err)
    //winston.error( err.message, err)
    //console.log('Here')

    err.level = '500'
    err.calling_error = 'genres_get'

    //Object.getOwnPropertyNames(err).forEach(function (name) {

    //    console.log(`${name}: ${err[name]}`)

    //})

    logger.error(err.message)

    // Error
    // Warning
    // Info
    // Verbose
    // Debug
    // Silly

    res.status(500).send('Soemthing Failed')

}