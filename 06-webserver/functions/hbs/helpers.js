const hbs = require('hbs');

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});