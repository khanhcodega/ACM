const mongoose = require('mongoose');
const { Schema } = mongoose;

const Feedback = new Schema(
    {
        name: { type: String },
        description: { type: String },
        position: { type: String },
        image: { type: String, maxLength: 255 },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Feedback', Feedback);
