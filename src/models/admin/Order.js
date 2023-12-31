const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    movieShowing: {
        type: Schema.Types.ObjectId,
        ref: "MovieShowing",
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    chairs: [
        {
            type: String,
            required: true,
        }
    ],


})

module.exports = mongoose.model('Order', orderSchema);