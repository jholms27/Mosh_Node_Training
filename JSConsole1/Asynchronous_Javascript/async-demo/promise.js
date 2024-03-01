//const { errors } = require("../../../../../AppData/Local/Microsoft/TypeScript/5.1/node_modules/undici-types/index")

console.log('Before')
// Promise starts in the pending state

 async function doSomeWork(id) {
     try {

         const user = await new Promise((resolve, reject) => { setTimeout(() => { /*resolve({ name: 'Jason', id: id })*/ reject(new Error('No user found')) }, 2000) })
         console.log(`User is: ${user.name}. With ID of: ${user.id}`)
         const repos = await new Promise((resolve, reject) => { setTimeout(() => { resolve(['repo1', 'repo2']) }, 2000) })
         console.log(`Users repos are: ${repos}`)

     }
     catch (err) {

         console.log(err.message)

     }

}


doSomeWork(1)
const p = new Promise((resolve, reject) => {

    //do some async work
    // ...

    setTimeout(() => {

        //resolve(1)
        reject(new Error('message'))

    }, 2000)
    


})


p
    .then(result => console.log('Result: ', result))
    .catch(err => console.log('Error: ', err.message))

    console.log('After')