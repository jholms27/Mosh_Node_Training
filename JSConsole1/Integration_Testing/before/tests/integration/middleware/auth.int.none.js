const auth = require('../../../middleware/auth')
const request = require('supertest')
const { User } = require('../../../models/user')
const mongoose = require('mongoose')
const { Genre } = require('../../../models/genre')



describe('auth middleware', () => {

    let server;
    let token;
    let payload;
    beforeEach(() => {

        token = new User().generateAuthToken();
        server = require('../../../index').server
    })

    afterEach(async () => {
        await Genre.remove({})
        server.close()
    })

    const exec = () => {

        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send(payload)
        

    }

    it('should return 401 if no token is provided', async () => {

        token = '';
        
        const response = await exec()

        expect(response.status).toBe(401)

    })

    it('should return 400 if invalid token is provided', async () => {

        token = 'a';

        const response = await exec()

        expect(response.status).toBe(400)

    })

    it('should return 200', async () => {

        payload = {name: 'genre1'}
        const response = await exec()

        expect(response.status).toBe(200)
        //console.log(response.body)
        //expect(response.body).toHaveProperty('name' , 'genre1')

    })
})