const fs = require('fs');

let todoList = [];

const saveDB = () => {
    let data = JSON.stringify(todoList);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Err(err);
    });

}

const create = (description) => {

    let todo = {
        description,
        completed: false
    };

    todoList.push(todo);
    saveDB();
    return todo;
}

module.exports = {
    create
}