import { Types } from "mongoose"
import { InferredOrderType } from "../models/orderModel.js"
import UserModelType from "./userModelType.js"

type OrderModelType = InferredOrderType & {
  _id: Types.ObjectId
  user: UserModelType
}

export default OrderModelType