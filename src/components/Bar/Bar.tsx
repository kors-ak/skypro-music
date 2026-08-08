'use client'

import { setIsPlaying } from '@/store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import cn from 'classnames'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import style from './bar.module.css'

export default function Bar() {
  const dispatch = useAppDispatch()
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack)
  const isPlaying = useAppSelector((state) => state.tracks.isPlaying)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error('Не удалось запустить аудио:', error)
        dispatch(setIsPlaying(false))
      })
    } else {
      audioRef.current.pause()
    }
  }, [currentTrack, isPlaying, dispatch])

  if (!currentTrack) return <></>

  const playTrack = () => {
    if (audioRef.current) {
      audioRef.current.play()
      dispatch(setIsPlaying(true))
    }
  }

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      dispatch(setIsPlaying(false))
    }
  }

  return (
    <div className={style.bar}>
      <audio
        className={style.bar__audio}
        ref={audioRef}
        src={currentTrack?.track_file}
        controls
      />
      <div className={style.bar__content}>
        <div className={style.bar__playerProgress}></div>
        <div className={style.bar__playerBlock}>
          <div className={style.bar__player}>
            <div className={style.player__controls}>
              <div className={style.player__btnPrev}>
                <svg className={style.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={cn(style.player__btnPlay, style.btn)}
                onClick={isPlaying ? pauseTrack : playTrack}
              >
                <svg className={style.player__btnPlaySvg}>
                  <use
                    xlinkHref={
                      isPlaying
                        ? '/img/icon/sprite.svg#icon-pause'
                        : '/img/icon/sprite.svg#icon-play'
                    }
                  ></use>
                </svg>
              </div>
              <div className={style.player__btnNext}>
                <svg className={style.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div className={cn(style.player__btnRepeat, style.btnIcon)}>
                <svg className={style.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div className={cn(style.player__btnShuffle, style.btnIcon)}>
                <svg className={style.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={style.player__trackPlay}>
              <div className={style.trackPlay__contain}>
                <div className={style.trackPlay__image}>
                  {currentTrack.logo ? (
                    <img
                      className={style.trackPlay__img}
                      src={currentTrack.logo}
                      alt={currentTrack.name}
                    />
                  ) : (
                    <svg className={style.trackPlay__svg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                  )}
                </div>
                <div className={style.trackPlay__name}>
                  <Link className={style.trackPlay__nameLink} href="">
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={style.trackPlay__author}>
                  <Link className={style.trackPlay__authorLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div className={style.trackPlay__dislike}>
                <div className={cn(style.player__btnShuffle, style.btnIcon)}>
                  <svg className={style.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div className={cn(style.trackPlay__dislike, style.btnIcon)}>
                  <svg className={style.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={style.bar__volumeBlock}>
            <div className={style.volume__content}>
              <div className={style.volume__image}>
                <svg className={style.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={cn(style.volume__progress, style.btn)}>
                <input
                  className={cn(style.volume__progressLine, style.btn)}
                  type="range"
                  name="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
