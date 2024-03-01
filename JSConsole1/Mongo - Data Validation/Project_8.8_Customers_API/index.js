const mongoose = require('mongoose');
const genres_ = require('./routes/genres');
const express = require('express');
const app = express();


mongoose.connect('mongodb://localhost/Vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres_);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));