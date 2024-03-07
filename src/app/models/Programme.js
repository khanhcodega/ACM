const mongoose = require('mongoose');
const { Schema } = mongoose;

const Programme = new Schema({
  heading: { type: String },
  description: { type: String },
  image: { type: String, maxLength: 255 },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Programme', Programme);