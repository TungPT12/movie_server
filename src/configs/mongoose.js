const mongoose = require('mongoose');

const uri = "mongodb+srv://TungPT:BoyPham1204@mongodb.y8qiteb.mongodb.net/movie_website?retryWrites=true&w=majority";

const connectMongoose = (callback) => {
    mongoose.connect(uri).then((client) => {
        callback();
        // console.log('Connected!')
    }).catch((error) => {
        console.log(error);
        throw "Error connect mongoose";
    })
}

module.exports = connectMongoose