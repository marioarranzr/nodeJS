const fs = require('fs');
const colors = require('colors/safe');

let data = '';

let listTable = (base, limit) => {
    return new Promise((resolve, reject) => {

        console.log(colors.green('=================='));
        console.log(colors.green(`Table ${base}`))
        console.log(colors.green('=================='));
        data = getMultiplyTable(base, limit);
        resolve(data);
    });
}

let createFile = (base, limit = 10) => {
    return new Promise((resolve, reject) => {

        data = getMultiplyTable(base, limit);

        fs.writeFile(`tables/table-${base}.txt`, data, (err) => {
            if (err) reject(err);
            else resolve(`table-${base}.txt`);
        });
    });
}

let getMultiplyTable = (base, limit = 10) => {
    if (!Number(base)) {
        reject(`${base} is not a number`);
        return;
    }

    for (let i = 0; i < limit; i++) {
        data += `${base} * ${i} = ${base * i}\n`;
    }

    return data;
}
module.exports = {
    createFile,
    listTable
}