const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true

    }
,
  bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    authors: [authorSchema]
    //_id: mongoose.Schema.ObjectId
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
    //console.log(courseId)
    //const course = await Course.findById(courseId)
    const course = await Course.updateOne({ _id: courseId }, {

        //$set: {

        //    'author.name': 'John Smith'

        //}

        $unset: {

            'author': {

                //$unset: {  }
                //'name': 'John Smith',
                //'bio': 'asd123'

            }

        }


    })
    //course.author.name = 'Mosh Hamedani'
    //course.save()

}

async function addAuthor(courseId, author) {

    course = await Course.findById(courseId)

    course.authors.push(author)

    course.save()


}

async function removeAuthor(courseid, authorid) {

    course = await Course.findById(courseid)
    author = course.authors.id(authorid)
    console.log(`${author} Was removed from the collection.`)
    course.authors.remove(author)
    course.save()
}

removeAuthor('65e1014d865fabace4e679ec','65e1014d865fabace4e679ea')
//addAuthor('65e1014d865fabace4e679ec', new Author({ name: 'Jason', bio:'Bio' }))

//updateAuthor('65e0e62554360e95fc1e0c0e')

//createCourse('Node Course', /*new Author({ name: 'Mosh' })*/);

//createCourse('Node_Course', [

//    new Author({ name: 'Mosh' }),
//    new Author({name:'Mosh'})

//])