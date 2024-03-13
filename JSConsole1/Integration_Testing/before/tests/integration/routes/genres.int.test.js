const request = require('supertest')

const { Genre } = require('../../../models/genre')
const mongoose = require('mongoose')
const { User } = require('../../../models/user')

describe('/api/genres', () => {

    let token;
    let id;
    let payload;
    let server;

    const exec = () => {

        return request(server)
            .get(`/api/genres/${id}`)
    }

    const execPost = () => {

        return request(server)
            .post(`/api/genres/`)
            .set('x-auth-token', token)
            .send(payload)
    }

    const execPut = () => {

        return request(server)
            .put(`/api/genres/${id}`)
            .send(payload)
    }

    const execDelete = () => {

        return request(server)
            .delete(`/api/genres/${id}`)
            .set('x-auth-token' , token)
            
    }


    beforeEach( async () => {
        
        token = ''
        server = require('../../../index').server
        payload = ''
        await Genre.collection.insertMany([

            { name: 'genre1' },
            { name: 'genre2' },


        ])

        const genre = await Genre.find({name: 'genre1'})
        id = genre[0].id

    })
    
    afterEach( async() => {

        server.close()
        await Genre.remove({})
    })


    describe('GET /', () => {
        
        it('should return all genres', async () => {

            id = ''
            const response = await exec()
            //expect(response.status).toBe(200)
            //expect(response.body.length).toBe(2)
            //expect(response.body.some(g => g.name === 'genre1'))
            
        })

    
    })

    describe('GET /:id',  () => {

        it('returns status 404 with no genre found', async () => {

            id = mongoose.Types.ObjectId()
            const response = await exec()

            expect(response.status).toBe(404)


        })

        it('returns the given genre with the correct id', async () => {

            id = mongoose.Types.ObjectId()
            const genre = new Genre({ name: 'genre3' , _id: id })
            await genre.save()
            const response = await exec()

            expect(response.body).toHaveProperty('_id' , genre._id.toHexString())

        })

    })


    describe('POST /', () => {

        it('should return a 401 if client is not logged in', async () => {


            const response = await execPost()

            expect(response.status).toBe(401)

        })

        it('should return a 400 if token is invalid', async () => {

            token = 'asd123'
            const response = await execPost()

            expect(response.status).toBe(400)

        })

        it('should return a 400 error if name is not longer than 5 chars', async () => {

            token = new User({ isAdmin: true }).generateAuthToken()
            payload = { name: 'gen'}
            const response = await execPost()

            expect(response.status).toBe(400)

        })

        it('should return a 400 error if name is longer than 50 chars', async () => {

            const longString = new Array(53).join('a')
            token = new User({ isAdmin: true }).generateAuthToken()
            payload = { name: longString }
            const response = await execPost()

            expect(response.status).toBe(400)

        })

        it('should save the genre and return 200 if it is valid. ', async () => {


            token = new User({ isAdmin: true }).generateAuthToken()
            payload = { name: 'genre1' }
            const response = await execPost()

            expect(response.status).toBe(200)

        })


    })

    describe('PUT /',  () => {

        it('should update a genre by ID and return 200', async () => {

            
            payload = { name: 'This is a new name' }

            const response = await execPut()

            expect(response.body.name).toMatch(payload.name)
            

        })


    })

    describe('DELETE /', () => {

        it('should return the deleted genre ', async () => {

            token = new User({ name: 'Jason', isAdmin: true }).generateAuthToken()

            const response = await execDelete()


            expect(response.body._id).toMatch(id)


        })


    })

})