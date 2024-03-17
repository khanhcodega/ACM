const mongoose = require('mongoose');
const { Schema } = mongoose;

const Orders = new Schema(
    {
        nameOrder: { type: String },
        salary: { type: String },
        request: { type: String },
        workPlace: { type: String },
        recruimentDay: { type: String },
        title: { type: String },
        expense: { type: String },
        quantity: { type: String },
        salaryBasic: { type: String },
        timeWork: { type: String },

    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Orders', Orders);
