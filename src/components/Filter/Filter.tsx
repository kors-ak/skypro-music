'use client'

import { data } from '@/data'
import { TrackType } from '@/sharedTypes/sharedTypes'
import { getUniqueTrackValues } from '@/utils/getUniqueTrackValues'
import { useState } from 'react'
import FilterItem from '../FilterItem/FilterItem'
import style from './filter.module.css'

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState<string | null>()

  const toggleFilter = (name: 'author' | 'year' | 'genre') => {
    setActiveFilter((prev) => (prev === name ? null : name))
  }

  const getValues = (name: keyof TrackType) => getUniqueTrackValues(data, name)

  return (
    <div className={style.centerblock__filter}>
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
