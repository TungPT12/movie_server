const express = require('express');

const genreController = require('../../controllers/client/genre');

const router = express.Router();

router.get('/api/movies/genres', genreController.getGenres)

module.exports = router