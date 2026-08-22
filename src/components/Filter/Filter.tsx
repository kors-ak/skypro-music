'use client'

import { TrackType } from '@/sharedTypes/sharedTypes'
import { getUniqueTrackValues } from '@/utils/getUniqueTrackValues'
import { useState } from 'react'
import FilterItem from '../FilterItem/FilterItem'
import style from './filter.module.css'

export default function Filter({ tracks }: { tracks: TrackType[] }) {
  const [activeFilter, setActiveFilter] = useState<string | null>()

  const toggleFilter = (name: 'author' | 'year' | 'genre') => {
    setActiveFilter((prev) => (prev === name ? null : name))
  }

  const getValues = (name: keyof TrackType) =>
    getUniqueTrackValues(tracks, name)

  return (
    <div className={style.centerblock__filter}>
      <div className={style.filter__title}>Искать по:</div>

      <FilterItem
        label="исполнителю"
        isOpen={activeFilter === 'author'}
        onClick={() => toggleFilter('author')}
        items={getValues('author')}
      />

      <FilterItem
        label="году выпуска"
        isOpen={activeFilter === 'year'}
        onClick={() => toggleFilter('year')}
        items={['По умолчанию', 'Сначала новые', 'Сначала старые']}
      />

      <FilterItem
        label="жанру"
        isOpen={activeFilter === 'genre'}
        onClick={() => toggleFilter('genre')}
        items={getValues('genre')}
      />
    </div>
  )
}
