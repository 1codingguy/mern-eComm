import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'
import ProductModelType from '@backend/productModelType'
import OrderModelType from '@backend/orderModelType'
const localData = localStorage.getItem('cart')

type CartItem = ProductModelType & { qty: number }

export type CartState = Pick<
  OrderModelType,
  | 'itemsPrice'
  | 'shippingPrice'
  | 'taxPrice'
  | 'totalPrice'
  | 'shippingAddress'
  | 'paymentMethod'
> & {
  cartItems: CartItem[]
}

const defaultCart: CartState = {
  cartItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  shippingAddress: {
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
  paymentMethod: 'Paypal',
}

const initialState: CartState =
  localData !== null ? JSON.parse(localData) : defaultCart

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload

      const existItem = state.cartItems.find(
        cartItem => cartItem._id === item._id
      )

      if (existItem) {
        state.cartItems = state.cartItems.map(cartItem => {
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
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      return updateCart(state)
    },
    clearCartItems: state => {
      state.cartItems = []
      return updateCart(state)
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions

export default cartSlice.reducer
