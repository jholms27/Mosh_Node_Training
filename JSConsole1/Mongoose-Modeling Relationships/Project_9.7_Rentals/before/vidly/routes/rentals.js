const {Movie, movieValidate} = require('../models/movie'); 
const { Genre } = require('../models/genre');
const { Rental,validateRental } = require('../models/rental_model')
const { Customer } = require('../models/customer')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Fawn = require('fawn')

Fawn.init(mongoose)


router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('name');
  res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validateRental(req.body); 
  console.log(error)
  if (error) return res.status(400).send(error.details[0].message);
  console.log('here')
//const genre = await Genre.findById(req.body.genreId);
    const customer = await Customer.findById(req.body.custId)
    console.log(customer)
    const movie = await Movie.findById(req.body.movieId).populate('genre', 'name')
    console.log(movie)
    //if (!genre) return res.status(400).send('Invalid genre.');
    if (!customer) return res.status(400).send('Invalid customer');
    if (!movie) return res.status(400).send('Invalid movie');
    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.')

  let rental = new Rental({ 
      customer: {

          name: customer.name,
          _id: customer._id,
          isGold: customer.isGold


      },
      movie: {
          /*_id: customer._id,*/
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate,
          _id: movie._id

      }
  });


    try {

        new Fawn.Task()

            .save("rentals", rental)
            .update( "movies", { _id: movie._id }, {

                $inc: { numberInStock: -1 }

            })
            .run()

    } catch (err) {

        res.status(500).send('Internal Server error.')

    }

    //rental = await rental.save();
    //movie.numberInStock--;
    //movie.save()
  
  res.send(rental);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const rental = await Movie.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  
  res.send(rental);
});

router.delete('/:id', async (req, res) => {
  const rental = await Movie.findByIdAndRemove(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

router.get('/:id', async (req, res) => {
  const rental = await Movie.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router; 

asd12

  new committed