const mongoose = require('mongoose');
const { Schema } = mongoose;

const Nurse = new Schema(
    {
        heading: { type: String },
        description: { type: String },
        date: { type: String },
        link: { type: String },

        image: { type: String, maxLength: 255 },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Nurse', Nurse);
