import { TrackType } from '@/sharedTypes/sharedTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
  currentTrack: null | TrackType
  isPlaying: boolean
  isMuted: boolean
  volume: number
}

const initialState: initialStateType = {
  currentTrack: null,
  isPlaying: false,
  isMuted: false,
  volume: 0.8,
}

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    },
    setIsMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
    },
  },
})

export const { setCurrentTrack, setIsPlaying, setIsMuted, setVolume } =
  trackSlice.actions
export const trackSliceReducer = trackSlice.reducer
