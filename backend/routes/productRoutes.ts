import express from 'express'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controller/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// api/products
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/top').get(getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
router.route('/:id/reviews').post(protect, createProductReview)

export default router
