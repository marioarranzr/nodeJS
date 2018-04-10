const argv = require('./config/yargs').argv;
const colors = require('colors/safe');

const { create, list, update } = require('./todo/todo');

let command = argv._[0];

switch (command) {
    case 'list':
        let taskList = list();

        console.log(colors.green('========== To Do ========='));

        for (const task of taskList) {
            console.log(task.description);
            console.log(task.completed ? `Status: ${colors.green('completed')} ` : '');
        }
        console.log(colors.green('==========================='));
        break;
    case 'create':
        let task = create(argv.description);
        console.log(task);
        break;
    case 'update':
        let updated = update(argv.description, argv.completed);
        console.log(updated ? `${colors.green('updated')} ` : `${colors.red('not updated')}`);
        break;

    default:
        console.log('Not recognised command');
}