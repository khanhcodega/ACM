const mongoose = require('mongoose');
const { Schema } = mongoose;

const Order = new Schema({
    nameOrder: { type: String },
    salary: { type: String },
    request: { type: String },
    workPlace: { type: String },
    recruimentDay: { type: String },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', Order);
