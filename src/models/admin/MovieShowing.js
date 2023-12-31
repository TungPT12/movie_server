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
            time: {
                type: String,
                required: true,
            },
            chairs: [
                {
                    title: {
                        type: String,
                        required: true,
                    },
                    isBooked: {
                        type: Boolean,
                        required: true
                    },
                    _id: false
                }
            ],
        },
    ],
})

module.exports = mongoose.model('MovieShowing', movieShowingSchema);