import { Request, Response, NextFunction } from 'express'
import UserModelType from '../types/userModelType.js'

interface RequestWithUser extends Request {
  user?: UserModelType
  cookies: { [key: string]: string }
}

type AsyncFunction = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => Promise<any>

const asyncHandler =
  (fn: AsyncFunction) =>
  (req: RequestWithUser, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }

export default asyncHandler
