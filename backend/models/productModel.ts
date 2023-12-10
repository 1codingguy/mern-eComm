import { Types, Schema, model, InferSchemaType } from 'mongoose'

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId, // when create a anything in DB, it has its own _id, which has its own type
      required: true,
      ref: 'User', // reference the "User" collection
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // automatically add the `createdAt` field
  }
)

const Product = model('Product', productSchema)

export type InferredProductType = InferSchemaType<typeof productSchema>

export type ProductType = InferredProductType & {
  _id: Types.ObjectId
  qty: number
}

export default Product