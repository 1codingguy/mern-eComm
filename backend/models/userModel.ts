import { Types, Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUser } from '../types/userModelType.js'

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

userSchema.pre('save', async function (next) {
  // Before saving a user record to MongoDB, check if modifying password
  if (!this.isModified('password')) {
    next()
  }

  // Encrypt the password if it's changed
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = model<IUser>('User', userSchema)

export default User
