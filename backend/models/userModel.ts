import { Types, Schema, InferSchemaType, model } from 'mongoose'

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

const User = model("User", userSchema)

type InferredType = InferSchemaType<typeof userSchema>

export type UserType = InferredType & {
  _id: Types.ObjectId
}
export default User
