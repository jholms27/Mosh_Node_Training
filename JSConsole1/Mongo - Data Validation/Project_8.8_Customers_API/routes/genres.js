const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Customer = mongoose.model('Customers', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
    },
    phone: {

        type:Number,
        maxlength:10
    },

    id_: {

        type: mongoose.Schema.Types.ObjectId

    }
}));

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.body)
  let customer = new Customer({ name: req.body.name, phone: req.body.phone });
  customer = await customer.save();
  console.log(customer)
  res.send(customer);
});

router.put('/:id', async (req, res) => {

    console.log(req.params)
  const { error } = validateCustomer(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

function validateCustomer(customer) {
  const schema = {
      name: Joi.string().min(3).required(),
      phone: Joi.number().integer().min(7),
      id_: Joi.string()
  };

  return Joi.validate(customer, schema);
}

module.exports = router;