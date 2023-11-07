import express from 'express'
import {
  getProducts,
  getProductById,
  createProduct,
} from '../controller/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// api/products
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getProductById)

export default router
