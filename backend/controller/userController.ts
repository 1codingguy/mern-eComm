import express from 'express'
import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const isPasswordMatch = user && (await user.matchPassword(password))

  if (isPasswordMatch) {
    const secret = process.env.JWT_SECRET as jwt.Secret

    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: '30d',
    })

    // Set JWT as HTTP only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // prevent attack
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    })

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register user
// @route   POST /api/users
// @access  Public

export const registerUser = asyncHandler(async (req, res) => {
  res.send('registerUser')
})

// @desc    Logout user & clear cookie
// @route   POST /api/users/logout
// @access  Private

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ message: 'Logged out successfully' })
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

export const getUserProfile = asyncHandler(async (req, res) => {
  res.send('getUserProfile')
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

export const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('updateUserProfile')
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin

export const getUsers = asyncHandler(async (req, res) => {
  res.send('getUsers')
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin

export const deleteUser = asyncHandler(async (req, res) => {
  res.send('deleteUser')
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin

export const getUserById = asyncHandler(async (req, res) => {
  res.send('getUserById')
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin

export const updateUser = asyncHandler(async (req, res) => {
  res.send('updateUser')
})

export default {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
