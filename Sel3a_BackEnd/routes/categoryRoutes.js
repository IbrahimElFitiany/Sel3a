const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');

router
  .route('/')
  .post(verifyToken, categoryController.addCategory);  // Add category

router
  .route('/:catId')
  .delete(verifyToken, categoryController.removeCategory);  // Remove category

router
  .route('/subcategory')
//  .post(verifyToken, categoryController.addSubCategory);  // Add subcategory

router
  .route('/subcategory/:subCategoryId')
 // .delete(verifyToken, categoryController.deleteSubCategory);  // Delete subcategory

module.exports = router;
