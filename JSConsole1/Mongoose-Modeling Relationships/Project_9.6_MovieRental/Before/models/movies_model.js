const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = require('./genre_model')

const Genre = Schema

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    genre: {

        type: mongoose.Schema.ObjectId,
        ref: 'Genre'

    },

    numberInStock: {

        type: Number,
        required: true

    },
    dailyRentalRate: {

        type: Number,
        required:true

    }
}));



function validateGenre(movie) {
  const schema = {
      title: Joi.string().min(3).required(),
      genre: Joi.string().min(3),
      numstock: Joi.number(),
      dailyrate: Joi.number()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie; 
exports.validate = validateGenre;