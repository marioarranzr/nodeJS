const fs = require('fs');

let data = '';

let createFile = (base) => {
    return new Promise((resolve, reject) => {

        if (!Number(base)) {
            reject(`${base} is not a number`);
            return;
        }

        for (let i = 0; i < 10; i++) {
            data += `${base} * ${i} = ${base * i}\n`;
        }

        fs.writeFile(`tables/table-${base}.txt`, data, (err) => {
            if (err) reject(err);
            else resolve(`table-${base}.txt`);
        });
    });
}

module.exports = {
    createFile
}