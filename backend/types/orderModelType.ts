import { Types } from "mongoose"
import { InferredOrderType } from "../models/orderModel.js"

type OrderModelType = InferredOrderType & {
  _id: Types.ObjectId
}

export default OrderModelType