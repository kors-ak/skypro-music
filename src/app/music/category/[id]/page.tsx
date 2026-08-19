'use client'

import Filter from '@/components/Filter/Filter'
import TracksContainer from '@/components/TracksContainer/TracksContainer'
import { handleTasksError } from '@/services/errorHandling'
import { getCategoryTraks, getTracks } from '@/services/tracksApi'
import { TrackType } from '@/sharedTypes/sharedTypes'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import style from './page.module.css'

export default function CategoryPage() {
  const params = useParams<{ id: string }>()

  const [tracks, setTracks] = useState<TrackType[]>([])
  const [trackIds, setTrackIds] = useState<number[]>([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getTracks()
      .then((data) => setTracks(data))
      .catch((error) => {
        handleTasksError(error, setError)
      })

    getCategoryTraks(Number(params.id))
      .then((data) => {
        setTrackIds(data.items)
        setTitle(data.name)
      })
      .catch((error) => {
        handleTasksError(error, setError)
      })
  }, [])

  return (
    <>
      <h2 className={style.heading}>{title}</h2>

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
          <Filter
            tracks={tracks.filter((track) =>
              trackIds.includes(Number(track._id))
            )}
          />

          <TracksContainer
            tracks={tracks.filter((track) =>
              trackIds.includes(Number(track._id))
            )}
          />
        </>
      )}
    </>
  )
}
