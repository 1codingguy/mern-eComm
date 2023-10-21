import { Types, Schema, InferSchemaType, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

interface IUser extends Document {
  name: string
  email: string
  password: string
  isAdmin: boolean
  matchPassword: (enteredPassword: string) => Promise<boolean>
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = model<IUser>('User', userSchema)

type InferredType = InferSchemaType<typeof userSchema>

export type UserType = InferredType & {
  _id: Types.ObjectId
}
export default User
