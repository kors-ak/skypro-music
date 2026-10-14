'use client'

import { useLikeTrack } from '@/hooks/useLikeTrack'
import { TrackType } from '@/sharedTypes/sharedTypes'
import {
  setCurrentTrack,
  setIsPlaying,
  setPlaylist,
} from '@/store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { formatDuration } from '@/utils/formatDuration'
import cn from 'classnames'
import Link from 'next/link'
import style from './track.module.css'

type TrackProps = {
  track: TrackType
  playlist: TrackType[]
}

export default function Track({ track, playlist }: TrackProps) {
  const dispatch = useAppDispatch()
  const { currentTrack, isPlaying } = useAppSelector((state) => state.tracks)
  const { isLoadingLike, errorMsg, toggleLike, isLike } = useLikeTrack(track)

  const isCurrentTrack: boolean = track._id === currentTrack?._id
  const isTrackPlaying: boolean = isPlaying && isCurrentTrack

  const handleClickTrack = () => {
    if (isCurrentTrack) {
      dispatch(setIsPlaying(!isTrackPlaying))
    } else {
      dispatch(setCurrentTrack(track))
      dispatch(setPlaylist(playlist))
      dispatch(setIsPlaying(true))
    }
  }

  errorMsg && console.error('Ошибка при лайке трека:', errorMsg)

  return (
    <div className={style.playlist__item} onClick={handleClickTrack}>
      <div className={style.playlist__track}>
        <div className={style.track__title}>
          <div className={style.track__titleImage}>
            {isCurrentTrack ? (
              <div
                className={cn(style.track__dot, {
                  [style.pulse]: isTrackPlaying,
                })}
              />
            ) : (
              <svg className={style.track__titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note" />
              </svg>
            )}
          </div>
          <div>
            <Link className={style.track__titleLink} href="">
              {track.name}
            </Link>
          </div>
        </div>
        <div className={style.track__author}>
          <Link className={style.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={style.track__album}>
          <Link className={style.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div>
          <button
            className={cn(
              style.track__likeBtn,
              isLoadingLike && style.track__likeBtn_loading,
              isLike && style.track__likeBtn_active
            )}
            onClick={(e) => {
              e.stopPropagation()
              toggleLike()
            }}
          >
            <svg className={style.track__timeSvg}>
              <use
                xlinkHref={`/img/icon/sprite.svg#icon-like${isLike ? '-active' : ''}`}
              />
            </svg>
          </button>
          <span className={style.track__timeText}>
            {formatDuration(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  )
}
