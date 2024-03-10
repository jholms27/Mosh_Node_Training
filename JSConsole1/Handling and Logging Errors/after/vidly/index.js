



/* STARTUP MODULES */
require('./startup/settings_checker')()
require('./startup/db')()
require('./startup/routes')()
require('./startup/Joi')() // Add Joi object id to the Joi Class




    //for (const [key, value] of Object.entries(ex)) {
    //    console.log(`${key}: ${value}`);
    //}

    //for(i in ex) {

    //    console.log( `${i}: ${ex[i]}`)

    //}

        //Object.getOwnPropertyNames(err).forEach(function (name) {

    //    console.log(`${name}: ${err[name]}`)

    //})