import { Types, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  isAdmin: boolean
  matchPassword: (enteredPassword: string) => Promise<boolean>
}

type UserModelType = IUser & {
  _id: Types.ObjectId
}

export default UserModelType