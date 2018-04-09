const { createFile } = require('./multiply');
// const multiply = require('./multiply');

let base = 3;

createFile(base)
    .then(file => console.log(`The file table-${base}.txt has been saved!`))
    .catch(e => console.log(e));