const site = require('./site')
const introduce = require('./introduce')
const nurse = require('./nurse')

function route(app) {
    app.use('/introduce',introduce)
    app.use('/nurse',nurse)
    app.use('/',site)
}

module.exports = route