const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/acm');
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect fauilure !!!');
    }
}
module.exports = { connect };
