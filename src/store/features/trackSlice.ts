import { TrackType } from '@/sharedTypes/sharedTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type initialStateType = {
  currentTrack: null | TrackType
  isPlaying: boolean
  isShuffled: boolean
  playlist: TrackType[]
  shuffledPlaylist: TrackType[]
  allTracks: TrackType[]
  favoriteTracks: TrackType[]
  fetchError: null | string
  fetchIsLoading: boolean
  fetchFavoritesError: null | string
  fetchFavoritesIsLoading: boolean
  filter: {
    authors: string[]
    age: string
    genre: string[]
  }
  search: string
}

const initialState: initialStateType = {
  currentTrack: null,
  isPlaying: false,
  isShuffled: false,
  playlist: [],
  shuffledPlaylist: [],
  allTracks: [],
  favoriteTracks: [],
  fetchError: null,
  fetchIsLoading: true,
  fetchFavoritesError: null,
  fetchFavoritesIsLoading: false,
  filter: {
    authors: [],
    age: 'По умолчанию',
    genre: [],
  },
  search: '',
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
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload
    },
    addLikedTrack: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload]
    },
    removeLikedTrack: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload._id
      )
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
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload
    },
    setFetchError: (state, action: PayloadAction<null | string>) => {
      state.fetchError = action.payload
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload
    },
    setFetchFavoritesError: (state, action: PayloadAction<null | string>) => {
      state.fetchFavoritesError = action.payload
    },
    setFetchFavoritesIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchFavoritesIsLoading = action.payload
    },
    setFilterAuthor: (state, action: PayloadAction<string>) => {
      const author = action.payload
      if (state.filter.authors.includes(author)) {
        state.filter.authors = state.filter.authors.filter(
          (item) => item !== author
        )
      } else {
        state.filter.authors = [...state.filter.authors, author]
      }
    },
    setFilterAge: (state, action: PayloadAction<string>) => {
      if (state.filter.age === action.payload) {
        state.filter.age = 'По умолчанию'
      } else {
        state.filter.age = action.payload
      }
    },
    setFilterGenre: (state, action: PayloadAction<string>) => {
      const genre = action.payload
      if (state.filter.genre.includes(genre)) {
        state.filter.genre = state.filter.genre.filter((item) => item !== genre)
      } else {
        state.filter.genre = [...state.filter.genre, genre]
      }
    },
    resetFilter: (state) => {
      state.filter = initialState.filter
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    resetTracksState: () => initialState,
  },
})

export const {
  setCurrentTrack,
  setIsPlaying,
  setPlaylist,
  setNextTrack,
  setPrevTrack,
  toggleIsShuffled,
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  setFavoriteTracks,
  addLikedTrack,
  removeLikedTrack,
  resetTracksState,
  setFetchFavoritesError,
  setFetchFavoritesIsLoading,
  setFilterAuthor,
  setFilterAge,
  setFilterGenre,
  resetFilter,
  setSearch,
} = trackSlice.actions
export const trackSliceReducer = trackSlice.reducer
