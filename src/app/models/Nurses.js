const mongoose = require('mongoose');
const { Schema } = mongoose;

const Nurses = new Schema(
    {
        heading: { type: String },
        description: { type: String },
        date: { type: String },
        link: { type: String, slug: 'name', unique: true },

        image: { type: String, maxLength: 255 },
        content: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Nurses', Nurses);
