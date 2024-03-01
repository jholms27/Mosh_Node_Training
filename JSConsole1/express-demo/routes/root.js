const express = require('express')
const router = express.Router()

const courses = [

    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }

];

router.get('/', (req, res) => {

    res.render('index', { title: 'My express app', message: 'Hello' })

})

module.exports = router