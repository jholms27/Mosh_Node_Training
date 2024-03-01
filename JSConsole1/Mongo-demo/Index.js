/*
Step 1: Connect to DB
Step 2: Set course schema
Step 3: set Course model
Create a course:
Step 1: Crete function for creating course
Step 2: Set course to new object from model.
Step 3: Use save method on the object.

*/



const mongoose = require('mongoose')
//const { connect } = require('../../../../../AppData/Local/Microsoft/TypeScript/5.1/node_modules/undici-types/api')

console.log('Here 1')



    //(async () => {

    //    const result = await startServer()
    //    console.log(result)

    //})().catch(e => { console.log(e) })


//const promise1 = new Promise((resolve, reject) => {

    


//})

async function startServer() {

    //return await new Promise((resvole, reject) => {

       const result = await mongoose.connect('mongodb://localhost/playground')

            .then((result) => { return result.set })
            .catch((err) => { return err.message })



    console.log('Async testing')
    console.log(result)
    return Promise.reject(result)

    //})



    //try {

    //    mongoose.connect('mongodb://localhost/playground')

    //        //.then(() => { console.log('Connected') })
    //        //.catch((err) => { console.log(err.message) })

    //} catch (err) {

    //    console.log(err)

    //}



    //return new Promise((resolve, reject) => {

    //    //resolve( mongoose.connect('mongodb://localhost/playground')

    //    //    .then(() => { /*console.log('Connected to MongoDB');*/ return 'Resolved!'    })
    //    //    .catch(err => console.log('Could not connect to MongoDB' + err.message))
    //    //    )
    //    //resolve('Resolved!')

    //    if (mongoose.connect('mongodb://localhost/playground')) {

    //        resolve('Resolved')

    //    } else {

    //        err = mongoose.connect('mongodb://localhost/playground')
    //        resolve(err.message)

    //    }

    //    //}
        
    //})

    


}



startServer()

    .then((message) => { console.log('Here 1: ' + message) })
    .catch((err) => {console.log('Here 2: ' +err) })
 //startServer().catch((err) => { console.log(err) })


//console.log(result)
//const connectionResult = startServer()
//setInterval(() => { console.log(connectionResult)  }, 2000)

console.log('Here 2')

async function validationCheck(v, t) {

    console.log(v.length)
    if (v && v.length > 0) {

        console.log('validation')
        return true

    } else {

        return false

    }

}





const courseSchema = new mongoose.Schema({

    

    // Static validation
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
        //match: /Regex Here/
    },
    author: String,
    //tags: [String],
     /*Custom validation logic.*/
    tags: {

        type: Array,
        validate: {
            
            validator: async function (v) {

                //console.log('Here is this: ' + this)
                //console.log('Here is v: ' + v)
                return await validationCheck(v,this)


            },
            message: 'A course should have at least one tag.'

        }

    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        /* Conditional validation*/
        type: Number,
        required: function () { return this.isPublished },
        //min: 10,
        //max: 100
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
    category: {

        type: String,
        /* Must equal one of these values*/
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        required: true,
        //uppercase: true,
        trim: true


    }

})


const Course = mongoose.model('Courses', courseSchema)

async function createCourse() { 


    const course = new Course({

        name: 'Angular Course',
        author: 'Jason',
        //tags: ['angular', 'frontend'],
        //tags: null,
        isPublished: true,
        category: 'web',
        price: 15

    })



    try {
        //const result = new Promise( (resolve, reject) => { await course.save(); } )
        const result = await course.save()
        console.log('Result is here: ' + result)
        return result
        //course.validate((err) => { })
        
    }
    catch (ex) {

        console.log('We failed!')
        console.log(ex.message)
        return result
    }

 


}

async function initCourse() {

    try {

        const result = await createCourse();
        //console.log(result)

    } catch (err) {

        console.log(err.message)

    }
    

}

//initCourse()

async function getCourses() {

    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    //gte (greater than or equal to)
    // lt (less than)
    //lte (less than equal to)
    // in
    // nin (not in)

    /*Logical Operators*/
    // or
    // and

    const courses = await Course
        //.find({ author: 'Mosh', isPublished: true })
        //.find({ price: {$gte: 10, $lte: 20} })
        //.find({ price: {$in: [10,15,20]} })
        //.find({ $or: [{ author: { $in: ['Jason', 'Mosh'] } }/*, {isPublished: true}*/], $and: [{isPublished:true}] })
        // Starts with Mosh
        //.find({ author: /^Mosh/ })

        //ends with Hemedani. Using the i switch makes it case insensitive.
        //.find({ author: /Hamedani$/i })

        // Contains Mosh
        //.find({author: /.*Mosh.*/})

        .find()
        //.or([{ author: 'Mosh' }, {author: 'Jason'} , { ispublished: true }])
        //.and([{ author: { $ne: null } }, { $or: [{ isPublished: { $ne: true } }, { isPublished: {$eq:true} } ] }])
        //.or([{ author: 'Mosh'  /*{$in: ['Mosh','Jason']}*/ }])
        //.and({ isPublished: true })
        //.or([{ author: 'Jason' }])
        //.and([{isPublished: false}])
        .limit(10)
        .count()
        //.skip((pageNumber - 1) * pageSize)
        //.limit(pageSize)
        //.sort({ name: 1 })
        //.select({name: 1,tags:1})
    console.log(courses);


}

//getCourses()





async function updateCourse(id) {

    // Query first
    // findByID()
    // Modify its properties
    //save()

    const course = await Course.findById(id)

    if (!course) {

        console.log('Could not find courses withthat ID.')
        return;

    } 

    //course.isPublished = true
    //course.author = 'Another Author'
    course.set({

        isPublished: true,
        author: 'Another author'

    })

    const result = await course.save()
    console.log(result)


}

//updateCourse('5a68fde3f09ad7646ddec17e')