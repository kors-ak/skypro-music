import { addLike, removeLike } from '@/services/tracksApi'
import { TrackType } from '@/sharedTypes/sharedTypes'
import { addLikedTrack, removeLikedTrack } from '@/store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { withReAuth } from '@/utils/withReAuth'
import { AxiosError } from 'axios'
import { useState } from 'react'

type returnTypeHook = {
  isLoadingLike: boolean
  errorMsg: string | null
  toggleLike: () => void
  isLike: boolean
}

export const useLikeTrack = (track: TrackType | null): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks)
  const { access, refresh } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const isLike = favoriteTracks.some((t) => t._id === track?._id)
  const [isLoadingLike, setIsLoadingLike] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const toggleLike = () => {
    if (isLoadingLike) return

    if (!access) {
      return setErrorMsg('Нет авторизации')
    }

    const actionApi = isLike ? removeLike : addLike
    const actionSlice = isLike ? removeLikedTrack : addLikedTrack

    setIsLoadingLike(true)
    setErrorMsg(null)

    if (track) {
      withReAuth(
        (newToken) => actionApi(newToken || access, track._id),
        refresh,
        dispatch
      )
        .then(() => {
          dispatch(actionSlice(track))
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              setErrorMsg(error.response.data.message)
            } else if (error.request) {
              setErrorMsg('Произошла ошибка. Попробуйте позже')
            } else {
              setErrorMsg('Неизвестная ошибка')
            }
          }
        })
        .finally(() => {
          setIsLoadingLike(false)
        })
    }
  }

  return {
    isLoadingLike,
    errorMsg,
    toggleLike,
    isLike,
  }
}
