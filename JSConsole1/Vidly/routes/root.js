const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true,
        minlength: 5,
        maxlength: 55


    },

    date: {

        type: String,
        default: Date.now


    },

    isPublished: {

        type: Boolean


    },
    author: {

        type: String,
        required: true

    },
    price: {

        type: Number

    },

    tags: {

        type: Array,
        validate: {

            validator: async function (v) {

                return await validateCourse(v, this)

            }

        }
    }

})

Genre = mongoose.model('Courses', courseSchema)


//const genres = [

//    { id: 1, name: 'genre1' },
//    { id: 2, name: 'genre2' },
//    { id: 3, name: 'genre3' }

//];

async function validateCourse() {

    


}





router.get('/', async (req, res) => {

    //res.render('index', { title: 'My express app', message: 'Hello' })
    //id = req.id
    const courses = await Genre.find()
    if (!courses) {

        res.status(404).send('The course was not found!')


    } else {

        res.send(courses)
    }
    res.send(courses)
    //getCourses()

    //    .then((courses) => { res.send(courses) })

})

router.post('/', async (req, res) => {

    let genre = new Genre({ name: req.body.name,author:req.body.author })
    genre = await genre.save()
    res.send(genre)



})

module.exports = router