const site = require('./site');
const introduce = require('./introduce');
const nurse = require('./nurse');
const news = require('./news');
const order = require('./order');
const manager = require('./manager');

function route(app) {
    app.use('/introduce', introduce);
    app.use('/manager', manager);

    app.use('/nurse', nurse);
    app.use('/tintuc', news);
    app.use('/order', order);
    app.use('/', site);
}

module.exports = route;
