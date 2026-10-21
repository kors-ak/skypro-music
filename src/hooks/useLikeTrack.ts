import { addLike, removeLike } from '@/services/tracksApi'
import { withReAuth } from '@/services/withReAuth'
import { TrackType } from '@/sharedTypes/sharedTypes'
import { addLikedTrack, removeLikedTrack } from '@/store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

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
  const router = useRouter()

  const isLike = favoriteTracks.some((t) => t._id === track?._id)
  const [isLoadingLike, setIsLoadingLike] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const toggleLike = () => {
    if (isLoadingLike) return

    if (!access) {
      toast.error('Войдите, чтобы добавить трек в избранное', {
        duration: 2000,
        action: {
          label: 'Войти',
          onClick: () => router.push('/auth/sign-in'),
        },
      })

      return
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
            const message =
              error.response?.data?.message ??
              (error.request
                ? 'Произошла ошибка. Попробуйте позже'
                : 'Не удалось изменить избранное')

            setErrorMsg(message)
            toast.error(message)
          } else {
            toast.error('Произошла неизвестная ошибка')
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
