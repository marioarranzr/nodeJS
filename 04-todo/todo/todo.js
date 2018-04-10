const fs = require('fs');

let todoList = [];

const saveDB = () => {
    let data = JSON.stringify(todoList);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Err(err);
    });
}

const loadDB = () => {
    try {
        todoList = require('../db/data.json');
    } catch (error) {
        todoList = [];
    }
}

const create = (description) => {

    loadDB();

    let todo = {
        description,
        completed: false
    };

    todoList.push(todo);
    saveDB();
    return todo;
}

const list = () => {
    loadDB();
    return todoList;
}

const update = (description, completed = true) => {
    loadDB();
    let index = todoList.findIndex(task => task.description == description);
    if (index < 0) {
        return false;
    } else {
        todoList[index].completed = completed;
        saveDB();
        return true;
    }
}

const remove = (description) => {
    loadDB();

    let newList = todoList.filter(task => task.description !== description);
    console.log(todoList);
    console.log(newList);
    if (newList.length === todoList.length) {
        return false;
    } else {
        todoList = newList;
        saveDB();
        return true;
    }
}

module.exports = {
    create,
    list,
    update,
    remove
}