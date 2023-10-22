import express from 'express'
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controller/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// /api/users
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/logout', logoutUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)

export default router
