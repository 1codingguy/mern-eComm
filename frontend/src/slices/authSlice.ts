// Set the user credential to local storage and remove them
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
    setCredentials: (state, action: PayloadAction<AuthState['userInfo']>) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    logout: state => {
      state.userInfo = null
      localStorage.removeItem('userInfo')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
