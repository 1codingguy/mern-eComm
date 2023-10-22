import jwt from 'jsonwebtoken'
import { Response } from 'express'

const generateToken = (res: Response, userId: string) => {
  const secret = process.env.JWT_SECRET as jwt.Secret

  const token = jwt.sign({ userId }, secret, {
    expiresIn: '30d',
  })

  // Set JWT as HTTP only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', // prevent attack
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  })
}

export default generateToken
