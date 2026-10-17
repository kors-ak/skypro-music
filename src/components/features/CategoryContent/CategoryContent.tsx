'use client'

import ErrorBlock from '@/components/features/ErrorBlock/ErrorBlock'
import Filter from '@/components/features/Filter/Filter'
import TracksContainer from '@/components/features/TracksContainer/TracksContainer'
import { useLoadTracks } from '@/components/initialization/TracksInitializer'
import TracksLoading from '@/components/loading/TracksLoading/TracksLoading'
import { CategoryType } from '@/sharedTypes/sharedTypes'
import { useAppSelector } from '@/store/hooks'
import style from './categoryContent.module.css'

type CategoryContentProps = {
  category: CategoryType
}

export default function CategoryContent({ category }: CategoryContentProps) {
  const { allTracks, fetchIsLoading, fetchError } = useAppSelector(
    (store) => store.tracks
  )

  const { loadTracks } = useLoadTracks()

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

  const categoryTracks = allTracks.filter((track) =>
    category.items.includes(track._id)
  )

  return (
    <>
      <h2 className={style.heading}>{category.name}</h2>

      <Filter tracks={categoryTracks} />

      <TracksContainer tracks={categoryTracks} />
    </>
  )
}
