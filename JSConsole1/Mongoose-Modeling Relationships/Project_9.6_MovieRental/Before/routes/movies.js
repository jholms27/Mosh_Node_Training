//const {Movie, validate} = require('../models/customer_model'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();    
const { Movie,validate } = require('../models/movies_model')

router.get('/', async (req, res) => {
    const customers = await Movie.find().populate('genre', 'name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let movie = new Movie({ 
    title: req.body.title,
    genre: req.body.genre,
      numberInStock: req.body.numstock,
    dailyRentalRate: req.body.dailyrate
  });
  movie = await movie.save();
  
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    }, { new: true });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

module.exports = router; 