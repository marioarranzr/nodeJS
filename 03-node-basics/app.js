const argv = require('yargs')
    .command('list', 'Print the multiply table', {
        base: {
            demand: true,
            alias: 'b'
        },
        limit: {
            alias: 'l',
            default: 10
        }
    })
    .command('create', 'Create the multiply table', {
        base: {
            demand: true,
            alias: 'b'
        },
        limit: {
            alias: 'l',
            default: 10
        }
    })
    .argv;

const { createFile, listTable } = require('./multiply');

let command = argv._[0];

switch (command) {
    case 'list':
        listTable(argv.base, argv.limit)
            .then(list => console.log(list))
            .catch(e => console.log(e));

        break;
    case 'create':
        createFile(argv.base, argv.limit)
            .then(file => console.log(`The file table-${argv.base}.txt has been saved!`))
            .catch(e => console.log(e));
        break;

    default:
        console.log('Not recognised command');
}