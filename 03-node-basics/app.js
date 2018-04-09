const { createFile } = require('./multiply');
// const multiply = require('./multiply');

// console.log(process.argv);
let argv = process.argv;
let parameter = argv[2];
let base = parameter.split('=')[1];

// to run the app `nodemon app.js --base=5`

createFile(base)
    .then(file => console.log(`The file table-${base}.txt has been saved!`))
    .catch(e => console.log(e));