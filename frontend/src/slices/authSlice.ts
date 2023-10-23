// Set the user credential to local storage and remove them
import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  userInfo: {
    _id: string
    name: string
    email: string
    isAdmin: boolean
    token: string
  } | null
}

const initialState: AuthState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') ?? '')
    : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
  },
})

export const { setCredentials } = authSlice.actions

export default authSlice.reducer
