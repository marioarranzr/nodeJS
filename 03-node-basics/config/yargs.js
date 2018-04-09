const opts = {
    base: {
        demand: true,
        alias: 'b'
    },
    limit: {
        alias: 'l',
        default: 10
    }
};
const argv = require('yargs')
    .command('list', 'Print the multiply table', opts)
    .command('create', 'Create the multiply table', opts)
    .argv;

module.exports = {
    argv
}