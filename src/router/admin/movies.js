const express = require('express');
const movieController = require('../../controllers/admin/movies');
// const { verifyAdminToken } = require('../../verifyToken/verifyAdminToken');
const router = express.Router();

// router.post('/category', verifyAdminToken, categoryController.createCategory)
router.get('/movies', movieController.getMovies)
router.get('/movies-showing', movieController.getMoviesShowing)
router.post('/movie-showing', movieController.createMovieShowing)
// router.get('/category/:id', verifyAdminToken, categoryController.getCategoryById)
// router.put('/category/:id', verifyAdminToken, categoryController.updateCategoryById)
// router.delete('/category/:id', verifyAdminToken, categoryController.deleteCategory)

module.exports = router