import { createSlice } from '@reduxjs/toolkit'

const localData = localStorage.getItem('cart')

const initialState =
  localData !== null ? JSON.parse(localData) : { cartItems: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {},
})

export default cartSlice.reducer
