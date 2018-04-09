const argv = require('./config/yargs').argv;
const { create } = require('./todo/todo');

let command = argv._[0];

switch (command) {
    case 'list':

        break;
    case 'create':
        let task = create(argv.description);
        console.log(task);
        break;
    case 'update':
        break;

    default:
        console.log('Not recognised command');
}