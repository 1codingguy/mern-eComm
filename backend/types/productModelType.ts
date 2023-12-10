import { InferredProductType } from "../models/productModel.js"
import { Types } from "mongoose"

type ProductModelType = InferredProductType & {
  _id: Types.ObjectId
  qty: number
}

export default ProductModelType
