const lib = require('../lib')
const exercise1 = require('../exercise1')
const db = require('../db')


const mockFunction = jest.fn();
mockFunction.mockReturnValue(1)
mockFunction.mockResvolvedValue(1)
mockFunction.mockRejectedValue(new Error('...')) // PUT IN TRY CATCH BLOCK IF USING THIS METHOD
const result = mockFunction()


describe('applyDscount', () => {

    it('Should apply 10 percent discount if customer has more than 10 points.', () => {

        db.getCustomerSync = mockFunction() // ALTERNATE WAY

        //db.getCustomerSync = function (customerId) {

        //    return {id: customerId, points: 11 }

        //}
        const order = { customerId: 1, totalPrice: 10 }
        lib.applyDiscount(order)
        expect(order.totalPrice).toBe(9)

        expect(mail.send).toHaveBeenCalled() // USE WITH MOCK FUNCTIONS THAT DO NOT RETURN A VALUE
        expect(mail.send).toHaveBeenCalledWith()
    })


})

describe('Exercise_1', () => {

    it('Should throw an error if the input is not a number ', () => {

        expect(() => { exercise1.fizzBuzz('asd123') }).toThrow();

    })

    it('Should return a FizzBuzz if the number is divisible by 3 && 5', () => {

        const result = exercise1.fizzBuzz(15)
        expect(result).toBe('FizzBuzz')

    })

    it('should return Fizz if the input is divisible by 3', () => {

        const result = exercise1.fizzBuzz(3)

        expect(result).toBe('Fizz')
        

    })

    it('should return Buzz if the input is divisible by 5', () => {

        const result = exercise1.fizzBuzz(5)

        expect(result).toBe('Buzz')


    })


})



describe('absolute',() => {

it('absolute = should return a positive number if input is positive', () => {

    const result = lib.absolute(1)
    expect(result).toBe(1)

})

it('absolute = should return a positive number if input is negative', () => {

    const result = lib.absolute(-1)
    expect(result).toBe(1)

})

it('absolute = should return zero if input is zero', () => {

    const result = lib.absolute(0)
    expect(result).toBe(0)

})

})


describe('greet', () => {

    // EXPECT RESULT TO BE EXACT STRING

    it('returns a greeing message to the initiator', () => {

        const result = lib.greet('Jason')
        expect(result).toBe('Welcome Jason')

    })

    // EXPECT RESULT TO BE LIKE A STRING USING A PATTERN

    it('returns a greeing message to the initiator', () => {

        const result = lib.greet('Jason')
        expect(result).toMatch(/^Welcome/)
        expect(result).toContain('Jason')

    })


})

describe('getCurrencies',() => {

    it('Should return supported currencies' , () => {

        

        const result = lib.getCurrencies();

        //console.log(result)
        //console.log(expect.arrayContaining(['USD', 'EUR', 'AUD']).sample)

        // Too General.
        /*expect(result).toBeDefined();*/
        /*expect(result).not.toBeNull()*/

        // Too specific.
        /*expect(result[0]).toBe('USD')*/
        /*expect(result.length).toBe(3)*/

        expect(result).toContain('USD')

        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD',  'AUD']))

})


})

describe('getProduct', () => {

    it('Should return the product with the given ID', () => {

        const result = lib.getProduct(1)
        expect(result).toEqual({ price: 10 , id:1 })
        //expect(result).toMatchObject({ id: 1 , price: 10})
        expect(result).toHaveProperty('id' , 1)

    })



})

describe('registerUser', () => {

    it('Should throw if username is falsy', () => {

        const args = [null, undefined, NaN, '', 0, false];

        args.forEach((a) => {

            expect(() => { lib.registerUser(null) }).toThrow();

        })

        

    })

    it('Should return a user object if a valid username is supplied', () => {

        const result = lib.registerUser('Jason')

        expect(result).toMatchObject({ username: 'Jason' })
        expect(result.id).toBeGreaterThan(0)


    })

})