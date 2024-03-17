const mongoose = require('mongoose');
const { Schema } = mongoose;

const Programme = new Schema(
    {
        heading: { type: String },
        description: { type: String },
        image: { type: String, maxLength: 255 },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Programme', Programme);
