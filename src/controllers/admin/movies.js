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
        let results = []
        if (moviesShowing.length > 0) {
            moviesShowing.forEach(movieShowing => {
                console.log(movieShowing.movieId)
                const movieDetail = movies.find(movie => {
                    return movieShowing.movieId === movie.id.toString();
                })
                console.log(movieDetail)
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
        const { movieId, price, date, times } = req.body;
        const movieShowing = new MovieShowing({
            movieId: movieId,
            price: price,
            times: times,
            date: date
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