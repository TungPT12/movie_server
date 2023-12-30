const express = require('express');
const userController = require('../../controllers/admin/user');
const { verifyAdminToken } = require('../../verifyToken/verifyAdminToken');
const router = express.Router();

// router.post('/category', verifyAdminToken, userController.createCategory)
router.get('/users', verifyAdminToken, userController.getUsers)
router.get('/user/count', verifyAdminToken, userController.getNumberUsers)
// router.put('/category/:id', verifyAdminToken, userController.updateCategoryById)
// router.delete('/category/:id', verifyAdminToken, userController.deleteCategory)

module.exports = router