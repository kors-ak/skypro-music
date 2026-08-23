import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserType = {
  username: string | null
  id: number | null
}

type initialStateType = {
  username: string | null
  id: number | null
}

const initialState: initialStateType = {
  username: null,
  id: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.username = action.payload.username
      state.id = action.payload.id
    },
  },
})

export const { setUser } = userSlice.actions
export const userSliceReducer = userSlice.reducer
