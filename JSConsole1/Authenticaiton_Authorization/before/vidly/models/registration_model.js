const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const config = require('config')

registrationSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true,
        minlength: 5

    },

    email: {

        type: String,
        unique: true

    },

    password: {

        type: String,
        required: true

    }
})
registrationSchema.methods.generateAuthToken = function () {

    token = jwt.sign({ id: this._id }, config.get('jwtPrivateKey'));
    return token;
}

const Registration = mongoose.model('Registration', registrationSchema );

function validateRegistration(registration) {
  const schema = {
    name: Joi.string().required(),
      email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
  };

  return Joi.validate(registration, schema);
}

exports.Registration = Registration; 
exports.validateRegistration = validateRegistration;
//exports.generateAuthToken = registrationSchema.generateAuthToken