/**
 *  Async Await
 */

let getName = async() => { // returns a Promise
        // throw new Error('GetName error');
        return 'Mario';
    }
    // Same functionality as async()
    // let getNombre = () => {
    //     return new Promise((resolve, reject) => {
    //         resolve('Mario');
    //     })
    // }

let sayHello = async() => {
    let name = await getName(); //wait for the getName response

    return `Hello ${name}`;
}

getName()
    .then(name => {
        console.log(`getName: ${name}`);
    }).catch(err => {
        console.log('Async error', err);
    })

sayHello()
    .then(res => {
        console.log(`sayHello: ${res}`);
    })