import { Types, Schema, model, Document } from 'mongoose'
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

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')){
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = model<IUser>('User', userSchema)

export type UserType = IUser & {
  _id: Types.ObjectId
}
export default User
