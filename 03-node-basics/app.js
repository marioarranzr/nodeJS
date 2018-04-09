// requireds
const fs = require('fs');

let base = 3;
let data = '';

for (let i = 0; i < 10; i++) {
    data += `${base} * ${i} = ${base * i}\n`;
}

fs.writeFile(`tables/table-${base}.txt`, data, (err) => {
    if (err) throw err;
    console.log(`The file table-${base}.txt has been saved!`);
});