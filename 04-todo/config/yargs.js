const create_opts = {
    description: {
        demand: true,
        alias: 'd'
    },
    completed: {
        alias: 'c',
        default: true
    }
};
const update_opts = {
    description: {
        demand: true,
        alias: 'd'
    }
};

const argv = require('yargs')
    .command('list', 'Show the ToDo list')
    .command('create', 'Create a new element', create_opts)
    .command('update', 'Update an element', update_opts)
    .command('remove', 'Remove an element', update_opts)
    .argv;

module.exports = {
    argv
}