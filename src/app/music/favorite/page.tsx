'use client'

import ErrorBlock from '@/components/features/ErrorBlock/ErrorBlock'
import Filter from '@/components/features/Filter/Filter'
import TracksContainer from '@/components/features/TracksContainer/TracksContainer'
import { useLoadTracks } from '@/components/initialization/TracksInitializer'
import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import TracksLoading from '../category/loading'
import style from '../main/page.module.css'

export default function FavoritePage() {
  const router = useRouter()
  const { access, refresh, username } = useAppSelector((store) => store.user)

  useEffect(() => {
    if (!username) {
      router.replace('/music/main')
    }
  }, [username])

  const { favoriteTracks, fetchIsLoading, fetchError } = useAppSelector(
    (store) => store.tracks
  )
  const { loadTracks, loadFavoriteTracks } = useLoadTracks()

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
        callback={() => {
          loadTracks()
          loadFavoriteTracks(access, refresh)
        }}
      />
    )
  }

  return (
    <>
      <h2 className={style.heading}>Мои треки</h2>

      <Filter tracks={favoriteTracks} />

      <TracksContainer tracks={favoriteTracks} />
    </>
  )
}
