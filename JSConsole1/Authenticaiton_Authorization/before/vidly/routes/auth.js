const {Registration,validateRegistration } = require('../models/registration_model')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { auth } = require('../middleware/auth_mid')

//router.get('/', async (req, res) => {



  
//});

router.post('/' , async (req, res) => {

    console.log(req.body)

    const user = await Registration.findById(req.body._id)
    if (!user) res.status(400).send('User with given id was not found')
    console.log(user.password)
    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if (!validPassword) res.status(400).send('Invalid email or password')

    //const token = jwt.sign({

    //    _id: user._id

    //},'jwtPrivateKey')

    const token = user.generateAuthToken();

    res.send(token)

});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router; 