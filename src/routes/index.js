const site = require('./site');
const introduce = require('./introduce');
const nurse = require('./nurse');
const news = require('./news');
const order = require('./order');

function route(app) {
    app.use('/introduce', introduce);
    app.use('/nurse', nurse);
    app.use('/news', news);
    app.use('/order', order);
    app.use('/', site);
}

module.exports = route;
