const mongoose = require('mongoose');
const { Schema } = mongoose;

const Activities = new Schema({
    heading: { type: String },
    title: { type: String },
    description: { type: String },
    link: { type: String },
    image: { type: String, maxLength: 255 },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activities', Activities);