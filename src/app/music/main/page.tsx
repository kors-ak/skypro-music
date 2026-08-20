'use client'

import ErrorBlock from '@/components/ErrorBlock/ErrorBlock'
import Filter from '@/components/Filter/Filter'
import TracksContainer from '@/components/TracksContainer/TracksContainer'
import { handleTracksError } from '@/services/errorHandling'
import { getTracks } from '@/services/tracksApi'
import { TrackType } from '@/sharedTypes/sharedTypes'
import { useEffect, useState } from 'react'
import style from './page.module.css'

export default function HomePage() {
  const [tracks, setTracks] = useState<TrackType[]>([])
  const [error, setError] = useState({ title: '', subtitle: '' })

  useEffect(() => {
    getTracks()
      .then((data) => setTracks(data))
      .catch((error) => {
        handleTracksError(error, setError)
      })
  }, [])

  return (
    <>
      <h2 className={style.heading}>Треки</h2>

      {error.title ? (
        <ErrorBlock
          error={error}
          callback={async () => {
            setError({ title: '', subtitle: '' })

            try {
              const data = await getTracks()
              return setTracks(data)
            } catch (error) {
              handleTracksError(error, setError)
            }
          }}
        />
      ) : (
        <>
          <Filter tracks={tracks} />

          <TracksContainer tracks={tracks} />
        </>
      )}
    </>
  )
}
