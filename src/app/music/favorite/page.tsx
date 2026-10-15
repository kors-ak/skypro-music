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

  const {
    favoriteTracks,
    fetchIsLoading,
    fetchError,
    fetchFavoritesIsLoading,
    fetchFavoritesError,
  } = useAppSelector((store) => store.tracks)
  const { loadTracks, loadFavoriteTracks } = useLoadTracks()

  if (fetchIsLoading || fetchFavoritesIsLoading) {
    return <TracksLoading />
  }

  if (fetchError || fetchFavoritesError) {
    return (
      <ErrorBlock
        error={{
          title: 'Ошибка загрузки',
          subtitle: fetchError || fetchFavoritesError,
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
