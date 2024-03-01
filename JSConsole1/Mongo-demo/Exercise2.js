const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
mongoose.connect('mongodb://localhost/mongo-exercises')

    .then(console.log('Connected to MongoDB'))
    .catch((err) => { console.log(err) })


const courseSchema = new mongoose.Schema({

    name: String,
    tags: [String],
    isPublished: Boolean,
    price: Number,
    date: String,
    author: String,
    _id: {type:String}


})

const Course = mongoose.model('courses', courseSchema)


async function getCourses() {

    return await Course

        .find({ isPublished: true, $or: [{ price: { $gt: 15 } }, { name: /.*.*/ } ] })/*"tags.0": 'node'*/ /*{$in: ['frontend','backend']}*/

        .sort({price:-1})
        //.select({name:1,author:1})

        
    


}

//const courses = getCourses()
//console.log(courses)

async function displayCourses() {

    const courses = await getCourses()
    console.log(courses)

}



//displayCourses()


async function updateCourse(id) {

    // Query first
    // findByID()
    // Modify its properties
    //save()
    //console.log(id)
    //const o_id = new ObjectId(id)
/*    console.log (o_id)*/
    const result = await Course.updateOne({ _id: id }, {

        $set: {

            author: 'Mosh',
            isPublished: false

        }

    })
    //console.log(course)
    //if (!course) {

    //    console.log('Could not find courses withthat ID.')
    //    return;

    //} else {

    //    console.log(course)
    //    course.set({

    //        isPublished: true,
    //        author: 'Another Author'

    //    })

    //    const result = await course.save()
        console.log(result)
        return
    //}

    //course.isPublished = true
    //course.author = 'Another Author'



}

//updateCourse('5a68fde3f09ad7646ddec17e')

async function removeCourse(id) {


    //const result = await Course.deleteOne({ _id: id })
    const course = await Course.findByIdAndDelete(id)
    console.log(course)
    return
}


removeCourse('5a68fe2142ae6a6482c4c9cb')