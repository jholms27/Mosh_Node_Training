const express = require('express')
const Joi = require('joi')

const router = express.Router()


const courses = [

    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }

];

router.get('/', (req, res) => {

    res.send([1, 2, 3]);
    res.send(courses)

})

router.post('/', (req, res) => {



    //res.send(req.body)


    //if (!req.body.name || req.body.name.length < 3) {

    //    res.status(400).send('Name is required and should be a minimum of 3 characters')


    //}

    const result = validateCourse(req.body)


    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return

    } else {

        //res.send('No Errors detected')
        const course = {

            id: courses.length + 1,
            name: req.body.name

        }



        courses.push(course)
        var courseResp = ''
        courses.forEach((ele) => courseResp += ele.id + ' ' + ele.name + ' ')
        res.send('Your course is: ' + course.id + course.name + 'The Course array is: ' + courseResp)
        return
    }




})

router.get('/:id', (req, res) => {

    //res.send(req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) res.status(404).send('The course with the given ID was not found.')
    res.send(course)


})

router.delete('/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {

        return res.status(404).send('The course with the given id was not found')
    }

    const index = courses.indexOf(course);

    courses.splice(index, 1);

    res.send(course);

})




function validateCourse(course) {

    const schema = Joi.object({
        name: Joi.string().min(3).required()

    });

    const result = schema.validate(course)
    return result
}



        module.exports = router