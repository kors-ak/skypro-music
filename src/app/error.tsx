'use client'

import Bar from '@/components/Bar/Bar'
import Nav from '@/components/Nav/Nav'
import Search from '@/components/Search/Search'
import UserBlock from '@/components/UserBlock/UserBlock'
import Image from 'next/image'
import { useEffect } from 'react'
import style from './error.module.css'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.main}>
          <Nav />

          <div className={style.centerblock}>
            <Search />

            <div className={style.error}>
              <Image
                src="/img/emoji_sad.png"
                alt="грустный смайлик"
                width={120}
                height={120}
              />
              <h2 className={style.error__title}>Ошибка загрузки</h2>
              <p className={style.error__subtitle}>
                Проверьте подключение к сети и повторите попытку
              </p>
              <button className={style.error__button} onClick={reset}>
                Повторить
              </button>
            </div>
          </div>

          <div className={style.userblock}>
            <UserBlock />
          </div>

          <Bar />
        </div>
      </div>
    </div>
  )
}
