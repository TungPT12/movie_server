const fs = require('fs')
const path = require('path');
const srcPath = require('../../utils/path');
const MovieShowing = require('../../models/admin/MovieShowing');
exports.getMovies = (req, res) => {
    try {
        const MOVIE_PATH = path.join(srcPath, 'data', 'movieList.json');
        const moviesJson = fs.readFileSync(MOVIE_PATH, 'utf-8', (error) => {
            console.log(error)
        })

        return res.json(JSON.parse(moviesJson))
    } catch (error) {
        console.log(error)
        return res.status(500).send(JSON.stringify({
            message: "Server Error",
            success: false
        }))
    }
}

exports.getMoviesShowing = async (req, res) => {
    try {
        const MOVIE_PATH = path.join(srcPath, 'data', 'movieList.json');
        const moviesJson = fs.readFileSync(MOVIE_PATH, 'utf-8', (error) => {
            console.log(error)
        })
        const movies = JSON.parse(moviesJson);

        const moviesShowing = await MovieShowing.find();
        console.log(moviesShowing)
        let results = []
        if (moviesShowing.length > 0) {
            moviesShowing.forEach(movieShowing => {
                const movieDetail = movies.find(movie => {
                    return movieShowing.movieId === movie.id.toString();
                })
                if (movieDetail) {
                    results.push({
                        _id: movieShowing._id,
                        movie: movieDetail,
                        price: movieShowing.price,
                        date: movieShowing.date,
                        times: movieShowing.times,
                    })
                }
            });
            return res.json(results)
        }
        return res.json(results)
    } catch (error) {
        console.log(error)
        return res.status(500).send(JSON.stringify({
            message: "Server Error",
            success: false
        }))
    }
}

exports.createMovieShowing = (req, res) => {
    try {
        const UpperCaseAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        const { movieId, price, date, times, quantity } = req.body;
        const row = Math.ceil(parseInt(quantity) / 10);
        const chairs = [];
        for (let index = 0; index < row; index++) {
            let count = 1;
            if (index === row - 1) {
                for (let j = index * 10; j < parseInt(quantity); j++) {
                    chairs.push({
                        title: `${UpperCaseAlphabet[index]}${count}`,
                        isBooked: false
                    })
                    count++;
                }
            } else {
                for (let j = index * 10; j < ((index + 1) * 10); j++) {

                    chairs.push({
                        title: `${UpperCaseAlphabet[index]}${count}`,
                        isBooked: false
                    })
                    count++;
                }
            }
        }

        let formatTimes = []

        times.forEach((time) => {
            formatTimes.push({
                time: time,
                chairs: chairs
            })
        })

        const movieShowing = new MovieShowing({
            movieId: movieId,
            price: price,
            times: formatTimes,
            date: date,
        })

        const movieShowingCreated = movieShowing.save();
        if (movieShowingCreated) {
            return res.json({
                success: true
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send(JSON.stringify({
            message: "Server Error",
            success: false
        }))
    }
}