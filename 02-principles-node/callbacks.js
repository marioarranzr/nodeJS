setTimeout(() => {
    console.log(`Hello world`);
}, 3000);

let getUserById = (id, callback) => {

    let user = {
        name: 'Mario',
        id
    }

    if (id == 20) {
        callback(`User with the Id ${id} doesn't exist in DB`)
    } else {
        callback(null, user);
    }
}

let getUserByIdInfo = (err, user) => {
    if (err) {
        return console.log(err);
    }
    console.log('User from DB: ', user);
}

getUserById(10, (err, user) => {
    getUserByIdInfo(err, user);
});

getUserById(20, (err, user) => {
    getUserByIdInfo(err, user);
});