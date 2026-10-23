'use client'

import { setSearch } from '@/store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import style from './search.module.css'

export default function Search() {
  const dispatch = useAppDispatch()
  const search = useAppSelector((state) => state.tracks.search)

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value))
  }

  return (
    <div className={style.centerblock__search}>
      <svg className={style.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={style.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={search || ''}
        onChange={onSearchChange}
      />
    </div>
  )
}
