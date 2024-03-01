const express = require('express')
const Joi = require('joi')
const mongoose = require('mongoose')
const router = express.Router()

/*mongoose.connect('mongodb://localhost/')*/

//const genres = [

//    { id: q, name: 'genre1' },
//    { id: 2, name: 'genre2' },
//    { id: 3, name: 'genre3' }

//];

router.get('/', (req, res) => {

    //res.send([1, 2, 3]);
    //res.send(genres)
    console.log(req)

})

router.post('/', (req, res) => {



    //res.send(req.body)


    //if (!req.body.name || req.body.name.length < 3) {

    //    res.status(400).send('Name is required and should be a minimum of 3 characters')


    //}

    const result = validateGenre(req.body)


    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return

    } else {

        //res.send('No Errors detected')
        const genre = {

            id: genres.length + 1,
            name: req.body.name

        }



        genres.push(genre)
        var courseResp = ''
        genres.forEach((ele) => courseResp += ele.id + ' ' + ele.name + ' ')
        res.send('Your course is: ' + course.id + course.name + 'The Course array is: ' + courseResp)
        return
    }




})

router.get('/:id', (req, res) => {

    //res.send(req.params.id);
    const genre = genres.find(c => c.id === parseInt(req.params.id));

    if (!genre) res.status(404).send('The course with the given ID was not found.')
    res.send(genre)


})

router.delete('/:id', (req, res) => {

    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {

        return res.status(404).send('The course with the given id was not found')
    }

    const index = genres.indexOf(genre);

    genres.splice(index, 1);

    res.send(genre);

})




function validateGenre(genre) {

    const schema = Joi.object({
        name: Joi.string().min(3).required()

    });

    const result = schema.validate(genre)
    return result
}



module.exports = router