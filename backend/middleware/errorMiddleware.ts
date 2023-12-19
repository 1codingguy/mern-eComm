import { Request, Response, NextFunction } from 'express'
import { Error as MongooseError } from 'mongoose'

interface CastError extends MongooseError {
  kind: string
}

type MiddleWare = [req: Request, res: Response, next: NextFunction]
type NotFound = (...params: MiddleWare) => void
type ErrorHandler = (err: Error, ...params: MiddleWare) => void

export const notFound: NotFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export const errorHandler: ErrorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  if (err.name === 'CastError' && (err as CastError).kind === 'ObjectId') {
    message = 'Resource not found'
    statusCode = 404
  }

  // this is inside `data` field of the error object
  // shape of the error object { status: number, data: {message, stack} }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  })
}
