'use client'

import ErrorBlock from '@/components/features/ErrorBlock/ErrorBlock'
import Filter from '@/components/features/Filter/Filter'
import TracksContainer from '@/components/features/TracksContainer/TracksContainer'
import { useLoadTracks } from '@/components/initialization/TracksInitializer'
import TracksLoading from '@/components/loading/TracksLoading/TracksLoading'
import { useAppSelector } from '@/store/hooks'
import style from './page.module.css'

export default function HomePage() {
  const { loadTracks } = useLoadTracks()
  const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
    (store) => store.tracks
  )

  if (fetchIsLoading) {
    return <TracksLoading />
  }

  if (fetchError) {
    return (
      <ErrorBlock
        error={{
          title: 'Ошибка загрузки',
          subtitle: fetchError,
        }}
        callback={loadTracks}
      />
    )
  }

  return (
    <>
      <h2 className={style.heading}>Треки</h2>
      <Filter tracks={allTracks} />
      <TracksContainer tracks={allTracks} playlistId="all" />
    </>
  )
}
