const argv = require('yargs')
    .options({
        address: {
            alias: 'a',
            demand: true
        }
    })
    .argv;

module.exports = {
    argv
}