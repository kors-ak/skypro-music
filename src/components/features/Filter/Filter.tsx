'use client'

import { TrackType } from '@/sharedTypes/sharedTypes'
import {
  setFilterAge,
  setFilterAuthor,
  setFilterGenre,
} from '@/store/features/trackSlice'
import { useAppDispatch } from '@/store/hooks'
import { getUniqueTrackValues } from '@/utils/getUniqueTrackValues'
import { useMemo, useState } from 'react'
import FilterItem from '../FilterItem/FilterItem'
import style from './filter.module.css'

export default function Filter({ tracks }: { tracks: TrackType[] }) {
  const [activeFilter, setActiveFilter] = useState<string | null>()
  const dispatch = useAppDispatch()

  const toggleFilter = (name: 'author' | 'year' | 'genre') => {
    setActiveFilter((prev) => (prev === name ? null : name))
  }

  const authors = useMemo(
    () => getUniqueTrackValues(tracks, 'author'),
    [tracks]
  )

  const genres = useMemo(() => getUniqueTrackValues(tracks, 'genre'), [tracks])

  return (
    <div className={style.centerblock__filter}>
      <div className={style.filter__title}>Искать по:</div>

      <FilterItem
        label="исполнителю"
        isOpen={activeFilter === 'author'}
        onClick={() => toggleFilter('author')}
        items={authors}
        onSelectFilter={(el: string) => dispatch(setFilterAuthor(el))}
      />

      <FilterItem
        label="году выпуска"
        isOpen={activeFilter === 'year'}
        onClick={() => toggleFilter('year')}
        items={['По умолчанию', 'Сначала новые', 'Сначала старые']}
        onSelectFilter={(el: string) => dispatch(setFilterAge(el))}
      />

      <FilterItem
        label="жанру"
        isOpen={activeFilter === 'genre'}
        onClick={() => toggleFilter('genre')}
        items={genres}
        onSelectFilter={(el: string) => dispatch(setFilterGenre(el))}
      />
    </div>
  )
}
