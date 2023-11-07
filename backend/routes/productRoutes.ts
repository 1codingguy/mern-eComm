import express from 'express'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} from '../controller/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// api/products
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getProductById).put(protect, admin, updateProduct)

export default router
