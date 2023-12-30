const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieShowingSchema = new Schema({
    movieId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    times: [
        {
            type: String,
            required: true,
        }
    ],
})

module.exports = mongoose.model('MovieShowing', movieShowingSchema);