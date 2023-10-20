import express from 'express'
import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

export const authUser = asyncHandler(async (req, res) => {
  res.send('authUser')
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
  res.send('logoutUser')
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