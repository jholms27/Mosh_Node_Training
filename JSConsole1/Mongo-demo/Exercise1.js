const mongoose = require('mongoose')

//setTimeout(() => {console.log('Testing Sync/Async')},2000)

console.log('Before Connection')
//console.log(Date())




mongoose.connect('mongodb://localhost/mongo-exercises')

    .then(console.log('Connected to MongoDB'))
    .catch((err) => { console.log('Could not Connect to MongoDB' + err.message) })


const courseSchema = new mongoose.Schema({

    tags: [String],
    date: String,
    author: String,
    isPublished: Boolean,
    name: String,
    price: Number

})

const Course = mongoose.model('Courses',courseSchema)


//function connectDb() {

//     return await mongoose.connect('mongodb://localhost/mongo-exercises')

//        .then(console.log('Connected to MongoDB'))
//        .catch(console.log('Could not Connect to MongoDB'))


//}


//const db = connectDb()

//console.log('After Connection')
//console.log(Date())

async function getCourses() {

    const courses = await Course

        .find()
        .sort({name:1})
        .select({ name: 1,author:1 })
        console.log(courses)

}

getCourses()