import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
  username: string
  access: string
  refresh: string
  isInitialized: boolean
}

const initialState: initialStateType = {
  username: '',
  access: '',
  refresh: '',
  isInitialized: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload
      localStorage.setItem('username', action.payload)
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access = action.payload
      localStorage.setItem('access', action.payload)
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refresh = action.payload
      localStorage.setItem('refresh', action.payload)
    },
    clearUserData: (state) => {
      state.username = ''
      state.access = ''
      state.refresh = ''
      localStorage.removeItem('username')
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
    },
    setUserInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload
    },
  },
})

export const {
  setUserName,
  setAccessToken,
  setRefreshToken,
  clearUserData,
  setUserInitialized,
} = userSlice.actions
export const userSliceReducer = userSlice.reducer
