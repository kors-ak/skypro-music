'use client'

import ErrorBlock from '@/components/ErrorBlock/ErrorBlock'
import Filter from '@/components/Filter/Filter'
import TracksContainer from '@/components/TracksContainer/TracksContainer'
import { handleTracksError } from '@/services/errorHandling'
import { getCategoryTraks, getTracks } from '@/services/tracksApi'
import { TrackType } from '@/sharedTypes/sharedTypes'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import style from './page.module.css'

export default function CategoryPage() {
  const params = useParams<{ id: string }>()

  const [tracks, setTracks] = useState<TrackType[]>([])
  const [trackIds, setTrackIds] = useState<number[]>([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState({ title: '', subtitle: '' })

  useEffect(() => {
    getTracks()
      .then((data) => setTracks(data))
      .catch((error) => {
        handleTracksError(error, setError)
      })

    getCategoryTraks(Number(params.id))
      .then((data) => {
        setTrackIds(data.items)
        setTitle(data.name)
      })
      .catch((error) => {
        handleTracksError(error, setError)
      })
  }, [])

  return (
    <>
      <h2 className={style.heading}>{title}</h2>

      {error.title ? (
        <ErrorBlock
          error={error}
          callback={async () => {
            setError({ title: '', subtitle: '' })
            await Promise.all([
              getTracks()
                .then((data) => setTracks(data))
                .catch((error) => {
                  handleTracksError(error, setError)
                }),
              getCategoryTraks(Number(params.id))
                .then((data) => {
                  setTrackIds(data.items)
                  setTitle(data.name)
                })
                .catch((error) => {
                  handleTracksError(error, setError)
                }),
            ])
          }}
        />
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
