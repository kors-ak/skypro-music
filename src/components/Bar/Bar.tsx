'use client'

import {
  setIsPlaying,
  setNextTrack,
  setPrevTrack,
  toggleIsShuffled,
} from '@/store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import cn from 'classnames'
import Link from 'next/link'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import ProgressBar from '../ProgressBar/ProgressBar'
import style from './bar.module.css'

export default function Bar() {
  const dispatch = useAppDispatch()
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack)
  const isPlaying = useAppSelector((state) => state.tracks.isPlaying)
  const isShuffled = useAppSelector((state) => state.tracks.isShuffled)

  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const wasPlayingRef = useRef(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setIsLoaded(false)
  }, [currentTrack])

  useEffect(() => {
    if (!audioRef.current || !currentTrack || !isLoaded) return

    audioRef.current.volume = volume
    audioRef.current.muted = isMuted

    if (isPlaying && !isSeeking) {
      audioRef.current.play().catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Не удалось запустить аудио:', error)
          dispatch(setIsPlaying(false))
        }
      })
    } else {
      audioRef.current.pause()
    }
  }, [currentTrack, isLoaded, isPlaying, isSeeking, isMuted, volume, dispatch])

  useEffect(() => {
    if (!isPlaying || isSeeking) return

    // отвечает за плавность заполнения полосы прогресса трека
    let animationFrameId: number

    const updateProgress = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime)
      }

      animationFrameId = requestAnimationFrame(updateProgress)
    }

    animationFrameId = requestAnimationFrame(updateProgress)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPlaying, isSeeking])

  if (!currentTrack) return <></>

  const togglePlay = () => dispatch(setIsPlaying(!isPlaying))
  const toggleShuffle = () => dispatch(toggleIsShuffled())

  const handleNextTrack = () => dispatch(setNextTrack())
  const handlePrevTrack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
    }
    dispatch(setPrevTrack())
  }

  const handleLoadedMetadata = () => {
    setIsLoaded(true)
    setDuration(audioRef.current?.duration || 0)
  }

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value)
      setCurrentTime(Number(e.target.value))
    }
  }

  const handleSeekStart = () => {
    wasPlayingRef.current = isPlaying
    setIsSeeking(true)
  }

  const handleSeekEnd = () => {
    setIsSeeking(false)

    if (wasPlayingRef.current) {
      dispatch(setIsPlaying(true))
    }
  }

  const handleVolumeUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value) / 100
    setVolume(newVolume)

    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  return (
    <div className={style.bar}>
      <audio
        className={style.bar__audio}
        ref={audioRef}
        src={currentTrack?.track_file}
        controls
        loop={isLooping}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNextTrack}
      />

      <div className={style.bar__content}>
        <ProgressBar
          max={duration}
          value={currentTime}
          onChange={(e) => handleProgressChange(e)}
          readOnly={!isLoaded}
          onMouseDown={handleSeekStart}
          onMouseUp={handleSeekEnd}
        />

        <div className={style.bar__playerBlock}>
          <div className={style.bar__player}>
            <div className={style.player__controls}>
              <button
                onClick={handlePrevTrack}
                className={style.player__btnPrev}
              >
                <svg className={style.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </button>
              <button
                className={cn(style.player__btnPlay, style.btn)}
                disabled={!isLoaded}
                onClick={togglePlay}
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
              </button>
              <button
                onClick={handleNextTrack}
                className={style.player__btnNext}
              >
                <svg className={style.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </button>
              <button
                className={cn(style.player__btnRepeat, style.btnIcon, {
                  [style.player__btnActive]: isLooping,
                })}
                disabled={!isLoaded}
                onClick={() => setIsLooping((prev) => !prev)}
              >
                <svg className={style.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </button>
              <button
                onClick={toggleShuffle}
                className={cn(style.player__btnShuffle, style.btnIcon, {
                  [style.player__btnActive]: isShuffled,
                })}
              >
                <svg className={style.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </button>
            </div>

            <div className={style.player__trackPlay}>
              <div className={style.trackPlay__contain}>
                <div className={style.trackPlay__image}>
                  <svg className={style.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
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
              <button
                className={style.volume__image}
                onClick={() => setIsMuted((prev) => !prev)}
              >
                <svg className={style.volume__svg} aria-hidden="true">
                  <use
                    xlinkHref={
                      isMuted
                        ? '/img/icon/sprite.svg#icon-muted'
                        : '/img/icon/sprite.svg#icon-volume'
                    }
                  ></use>
                </svg>
              </button>
              <div className={cn(style.volume__progress, style.btn)}>
                <input
                  className={cn(style.volume__progressLine, style.btn)}
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume * 100}
                  onChange={(e) => handleVolumeUpdate(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
