const express = require('express');

const movieController = require('../../controllers/client/movie');

const router = express.Router();

router.get('/api/movies/originals', movieController.getOriginalsMovies)

router.get('/api/movies/trending', movieController.getTrendingMovies)

router.get('/api/movies/top-rate', movieController.getTopRatingMovies)

router.get('/api/movies/discover', movieController.getDiscoverMovies)

router.post('/api/movies/video', movieController.getVideo)

router.post('/api/movies/search', movieController.searchMovies)
router.get('/api/movies/movies-showing', movieController.getMoviesShowing)
router.get('/api/movies/movies-showing/:id', movieController.getMoviesShowingDetail)

module.exports = router
