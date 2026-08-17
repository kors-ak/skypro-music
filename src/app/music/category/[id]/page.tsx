'use client'

import Filter from '@/components/Filter/Filter'
import TracksContainer from '@/components/TracksContainer/TracksContainer'
import { notFound, useParams } from 'next/navigation'
import style from './page.module.css'

const getTitle = (id: string) => {
  switch (id) {
    case '1':
      return 'Плейлист дня'

    case '2':
      return '100 танцевальных хитов'

    case '3':
      return 'Инди заряд'

    case 'favorite':
      return 'Мои треки'

    default:
      return
  }
}

export default function CategoryPage() {
  const params = useParams<{ id: string }>()
  const title = getTitle(params.id)

  if (!title) notFound()

  return (
    <>
      <h2 className={style.heading}>{title}</h2>

      <Filter />

      <TracksContainer />
    </>
  )
}
