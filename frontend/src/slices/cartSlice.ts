import { createSlice } from '@reduxjs/toolkit'

const localData = localStorage.getItem('cart')

const initialState =
  localData !== null ? JSON.parse(localData) : { cartItems: [] }

const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)

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
          // what's the point of this step if not changing the quantity?
          return cartItem._id === existItem._id ? item : cartItem
        })
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      // calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => {
          return acc + item.price * item.qty
        }, 0)
      )

      // calculate shipping price ($10 shipping, free if order over $100)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

      // calculate tax price (15%)
      state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice.toFixed(2)))

      // calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2)

      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer
