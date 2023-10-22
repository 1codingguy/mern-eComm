import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

type JwtPayLoadWithUserId = jwt.JwtPayload & { userId: string }

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token: string | undefined

  // Read the JWT from cookie
  // req.cookies only exists if we use cookie-parser middleware
  token = req.cookies?.jwt

  if (token) {
    try {
      // object with 'userId' field
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as jwt.Secret
      ) as JwtPayLoadWithUserId

      // Add user to request object which is available in all routes
      const user = await User.findById(decoded.userId).select('-password')

      if (user) {
        req.user = user
      }

      // calls next middleware when this middleware is done
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req: any, res: any, next: any) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { admin, protect }
