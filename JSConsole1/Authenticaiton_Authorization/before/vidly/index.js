const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const auth = require('./routes/auth')
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const registration = require('./routes/registration')
const express = require('express');
const app = express();
const bcrypt = require('bcrypt')


async function salt() {
    
    let salt = await bcrypt.genSalt(10)
    console.log(salt)

}
salt()
//let hash = bcrypt.hash('asd123')

//console.log(hash)

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/registration', registration)
app.use('/api/auth',auth)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));