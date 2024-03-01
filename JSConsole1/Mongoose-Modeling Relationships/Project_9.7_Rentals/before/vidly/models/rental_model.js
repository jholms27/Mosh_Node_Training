const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const { movieSchema } = require('./movie')
const { CustomerSchema, customerSchema } = require('./customer')

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {

        type: new mongoose.Schema({

            name: {

                type: String,
                required: true,
                minlength: 0,
                maxlength:255

            },
            isGold: {

                type: Boolean,
                required:true

            },
            _id: {

                type: mongoose.Schema.ObjectId

            }


        })


    },
    //genre: {
    //    type: new mongoose.Schema({

    //        name: {

    //            type: String,
    //            minlength: 5,
    //            maxlength:255

    //        },
    //        _id: mongoose.Schema.ObjectId
            


    //    })
    //},
    movie: {

        type: new mongoose.Schema({

            title: {

                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength:255

            },
            dailyRentalRate: {

                type: Number,
                required: true,
                min: 0,
                max:255

            }


        })

    },

    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

function validateRental(rental) {

    console.log('Here')
  const schema = {

      custId: Joi.string().required(),
      movieId: Joi.string().required()

  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental; 
exports.validateRental = validateRental;