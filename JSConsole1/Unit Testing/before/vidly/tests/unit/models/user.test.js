const { User, userSchema } = require('../../../models/user')



describe('user.generateAuthToken', () => {

    it('generates and returns a token', () => {

        const payload = { _id: new mongoose.Types.objectId().toHexString(), isAdmin: true }
        user = new User(payload)

        const token = user.generateAuthToken()

        expect(token).not.toBeNull()


    })


})