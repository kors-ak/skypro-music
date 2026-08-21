'use client'

import Bar from '@/components/Bar/Bar'
import ErrorBlock from '@/components/ErrorBlock/ErrorBlock'
import Nav from '@/components/Nav/Nav'
import Search from '@/components/Search/Search'
import UserBlock from '@/components/UserBlock/UserBlock'
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

            <ErrorBlock
              error={{
                title: 'Ошибка загрузки',
                subtitle: 'Проверьте подключение к сети и повторите попытку',
              }}
              callback={async () => {
                reset()
              }}
            />
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
