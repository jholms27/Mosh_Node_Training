console.log('Before')

getUser(1, getRepos)

function displayRepos(repos) {
    console.log(`Repos for this user: ${repos}`)

}

function getRepos(user) {
    console.log(`User is : ${user.gitHubUsername}`)
    getRepos_(user.gitHubUsername, displayRepos)

}
function getUser(id, callback) {

    setTimeout(() => {

        console.log('Reading a user from a database.')
        callback({ id: id, gitHubUsername: 'mosh' });
    }, 2000);

}




function getRepos_(username, callback) {

    setTimeout(() => {

        console.log('Calling GitHub API...')
        callback(['repo1','repo2','repo3'])

    }, 2000)

}



console.log('After')