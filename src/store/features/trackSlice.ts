import { TrackType } from '@/sharedTypes/sharedTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
  currentTrack: null | TrackType
  isPlaying: boolean
  isShuffled: boolean
  playlist: TrackType[]
  shuffledPlaylist: TrackType[]
}

const initialState: initialStateType = {
  currentTrack: null,
  isPlaying: false,
  isShuffled: false,
  playlist: [],
  shuffledPlaylist: [],
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
    toggleIsShuffled: (state) => {
      state.isShuffled = !state.isShuffled

      if (!state.isShuffled || !state.currentTrack) return

      const otherTracks = state.playlist.filter(
        (track) => track._id !== state.currentTrack?._id
      )

      state.shuffledPlaylist = [
        state.currentTrack,
        ...otherTracks.sort(() => Math.random() - 0.5),
      ]
    },
    setPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload
    },
    setNextTrack: (state) => {
      const currentPlaylist = state.isShuffled
        ? state.shuffledPlaylist
        : state.playlist

      if (state.currentTrack) {
        const currentTrackIndex = currentPlaylist.findIndex(
          (el) => el._id === state.currentTrack?._id
        )

        const nextTrackIndex =
          currentTrackIndex === currentPlaylist.length - 1
            ? 0
            : currentTrackIndex + 1

        state.currentTrack = currentPlaylist[nextTrackIndex]
      }
    },
    setPrevTrack: (state) => {
      const currentPlaylist = state.isShuffled
        ? state.shuffledPlaylist
        : state.playlist

      if (state.currentTrack) {
        const currentTrackIndex = currentPlaylist.findIndex(
          (el) => el._id === state.currentTrack?._id
        )

        const prevTrackIndex =
          currentTrackIndex === 0 ? 0 : currentTrackIndex - 1

        state.currentTrack = currentPlaylist[prevTrackIndex]
      }
    },
  },
})

export const {
  setCurrentTrack,
  setIsPlaying,
  setPlaylist,
  setNextTrack,
  setPrevTrack,
  toggleIsShuffled,
} = trackSlice.actions
export const trackSliceReducer = trackSlice.reducer
