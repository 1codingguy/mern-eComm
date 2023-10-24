import { createSlice } from '@reduxjs/toolkit'
import { ProductType } from '../../../backend/models/productModel'
import { updateCart } from '../utils/cartUtils'

const localData = localStorage.getItem('cart')

export interface CartItemsType extends ProductType {
  qty: number
}

// cartItems should be OrderType.orderItems instead because there is `qty` property, confirm and correct later
export interface CartState {
  cartItems: CartItemsType[] | []
  itemsPrice: string
  shippingPrice: string
  taxPrice: string
  totalPrice: string
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
}

const initialState: CartState =
  localData !== null
    ? JSON.parse(localData)
    : { cartItems: [], shippingAddress: {}, paymentMethod: 'Paypal' }

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      // item is {ProductType && qty}
      const item = action.payload

      const existItem = state.cartItems.find(
        cartItem => cartItem._id === item._id
      )

      if (existItem) {
        state.cartItems = state.cartItems.map(cartItem => {
          // what's the point of this step if not changing the quantity?
          return cartItem._id === existItem._id ? item : cartItem
        })
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      return updateCart(state)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        cartItem => cartItem._id !== action.payload.id
      )
      return updateCart(state)
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      return updateCart(state)
    },
  },
})

export const { addToCart, removeFromCart, saveShippingAddress } =
  cartSlice.actions

export default cartSlice.reducer
