'use client'

import Filter from '@/components/Filter/Filter'
import TracksContainer from '@/components/TracksContainer/TracksContainer'
import { handleTasksError } from '@/services/errorHandling'
import { getTracks } from '@/services/tracksApi'
import { TrackType } from '@/sharedTypes/sharedTypes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import style from './page.module.css'

export default function HomePage() {
  const [tracks, setTracks] = useState<TrackType[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    getTracks()
      .then((data) => setTracks(data))
      .catch((error) => {
        handleTasksError(error, setError)
      })
  }, [])

  return (
    <>
      <h2 className={style.heading}>Треки</h2>

      {error ? (
        <div className={style.error}>
          {error}
          <Image
            src="/img/emoji_crying.png"
            alt="плачущий смайлик"
            width={52}
            height={52}
          />
        </div>
      ) : (
        <>
          <Filter tracks={tracks} />

          <TracksContainer tracks={tracks} />
        </>
      )}
    </>
  )
}
