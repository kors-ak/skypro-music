'use client'

import { useState } from 'react'
import style from './search.module.css'

export default function Search() {
  const [searchValue, setSearchValue] = useState('')

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
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
        value={searchValue}
        onChange={onSearchChange}
      />
    </div>
  )
}
