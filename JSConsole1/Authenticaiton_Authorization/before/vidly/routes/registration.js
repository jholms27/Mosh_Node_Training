const {Registration,validateRegistration } = require('../models/registration_model')
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { auth } = require('../middleware/auth_mid')

//Fawn.init(mongoose);

router.get('/me', auth, async (req, res) => {
    //console.log(req.user.id)
    const user = await Registration.findById(req.user.id).select('-password')
    res.send(user)

  
});

router.post('/', async (req, res) => {
    //console.log('Here')

  const { error } = validateRegistration(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Registration.findById(req.body.userId);
  if (customer) return res.status(400).send('Customer already exists.');



  const registration = new Registration( 
    _.pick(req.body, ['password','name','email'])
  );


    
    const salt = await bcrypt.genSalt(10)
    registration.password = await bcrypt.hash( registration.password, salt)


    try {

        await registration.save()/*.catch(err => console.log(err))*/
    } catch (err) {

        console.log(err.message)
        res.status(500).send('Internal Server Error')
        return
    }

    
        token = registration.generateAuthToken()
        res.header('x-auth-token', token).send(_.pick(registration, ['name', 'email']))
 


  //try {
  //  new Fawn.Task()
  //    .save('rentals', rental)
  //    //.update('movies', { _id: movie._id }, { 
  //      $inc: { numberInStock: -1 }
  //    })
  //    .run();
  
  //  res.send(rental);
  //}
  //catch(ex) {
  //  res.status(500).send('Something failed.');
  //}
});

module.exports = router; 