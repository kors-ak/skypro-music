'use client'

import { handleTracksError } from '@/services/errorHandling'
import { getTracks } from '@/services/tracksApi'
import {
  setAllTracks,
  setFetchError,
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

  return loadTracks
}

export default function TracksInitializer() {
  const { allTracks } = useAppSelector((state) => state.tracks)
  const loadTracks = useLoadTracks()

  useEffect(() => {
    if (!allTracks.length) {
      loadTracks()
    }
  }, [allTracks.length, loadTracks])

  return null
}
