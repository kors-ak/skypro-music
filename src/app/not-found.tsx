import Bar from '@/components/Bar/Bar'
import Nav from '@/components/Nav/Nav'
import Search from '@/components/Search/Search'
import UserBlock from '@/components/UserBlock/UserBlock'
import Image from 'next/image'
import Link from 'next/link'
import style from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.main}>
          <Nav />

          <div className={style.centerblock}>
            <Search />

            <div className={style.card}>
              <div className={style.code}>404</div>
              <div className={style.title}>
                Страница не найдена{' '}
                <Image
                  src="/img/emoji_crying.png"
                  alt="crying emoji"
                  width={52}
                  height={52}
                />
              </div>
              <div className={style.subtitle}>
                Возможно, она была удалена
                <br />
                или перенесена на другой адрес
              </div>

              <Link href="/music/main" className={style.button}>
                Вернуться на главную
              </Link>
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
