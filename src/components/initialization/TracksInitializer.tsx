'use client'

import { handleTracksError } from '@/services/errorHandling'
import { getFavTracks, getTracks } from '@/services/tracksApi'
import { withReAuth } from '@/services/withReAuth'
import {
  setAllTracks,
  setFavoriteTracks,
  setFetchError,
  setFetchFavoritesError,
  setFetchFavoritesIsLoading,
  setFetchIsLoading,
} from '@/store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useCallback, useEffect } from 'react'

export function useLoadTracks() {
  const dispatch = useAppDispatch()

  const loadTracks = useCallback(() => {
    dispatch(setFetchError(null))
    dispatch(setFetchIsLoading(true))

    getTracks()
      .then((tracks) => {
        dispatch(setAllTracks(tracks))
      })
      .catch((error) => {
        const errorText = handleTracksError(error)
        dispatch(setFetchError(errorText))
      })
      .finally(() => {
        dispatch(setFetchIsLoading(false))
      })
  }, [dispatch])

  const loadFavoriteTracks = useCallback(
    (access: string, refresh: string) => {
      dispatch(setFetchFavoritesError(null))
      dispatch(setFetchFavoritesIsLoading(true))

      withReAuth(
        (newToken) => getFavTracks(newToken || access),
        refresh,
        dispatch
      )
        .then((favTracks) => {
          dispatch(setFavoriteTracks(favTracks))
        })
        .catch((error) => {
          const errorText = handleTracksError(error)
          dispatch(setFetchFavoritesError(errorText))
        })
        .finally(() => {
          dispatch(setFetchFavoritesIsLoading(false))
        })
    },
    [dispatch]
  )

  return { loadTracks, loadFavoriteTracks }
}

export default function TracksInitializer() {
  const { allTracks, favoriteTracks } = useAppSelector((state) => state.tracks)
  const { access, refresh } = useAppSelector((state) => state.user) || ''
  const { loadTracks, loadFavoriteTracks } = useLoadTracks()

  useEffect(() => {
    if (!allTracks.length) {
      loadTracks()
    }
  }, [allTracks.length, loadTracks])

  useEffect(() => {
    if (!favoriteTracks.length && access && refresh) {
      loadFavoriteTracks(access, refresh)
    }
  }, [favoriteTracks.length, access, refresh, loadFavoriteTracks])

  return null
}
