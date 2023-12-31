const express = require('express');
const orderController = require('../../controllers/client/order');
// const { verifyAdminToken } = require('../../verifyToken/verifyAdminToken');
const router = express.Router();

// router.post('/category', verifyAdminToken, categoryController.createCategory)
router.post('/api/movies/buy-ticket', orderController.createOrder)
// router.get('/category/:id', verifyAdminToken, categoryController.getCategoryById)
// router.put('/category/:id', verifyAdminToken, categoryController.updateCategoryById)
// router.delete('/category/:id', verifyAdminToken, categoryController.deleteCategory)

module.exports = router