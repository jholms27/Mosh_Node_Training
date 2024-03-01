const express = require('express')
const config = require('config')
const logger = require('./middleware/Logger')
const helmet = require('helmet')
const morgan = require('morgan')
const debug = require('debug')('app:startup')

const courses = require('./routes/courses')
const root = require('./routes/root')

const app = express()

app.set('view engine', 'pug')
app.set('views','./views')

app.use(express.json())
//app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use(logger)
app.use('/api/courses', courses);
app.use('/',root)

console.log('Application name is: ' + config.get('name'))
console.log('Mail Server: ' + config.get('mail.host'));
debug('Mail password: ' + config.get('mail.password'))

console.log(`NODE_ENV is set to: ${process.env.NODE_ENV}`)
console.log(`App is set to ${app.get('env')}`);

if (app.get('env') === 'development') {

    app.use(morgan('tiny'))
    console.log('Morgan enabled...')

}




app.get('/api/posts/:year/:month', (req, res) => {

    res.send(req.query);
    res.send(req.year);
    res.send(req.motnh);

})

const port = process.env.PORT || 3000

app.listen(port, () => {

    console.log('Listening on port ' + port + '...')

})
