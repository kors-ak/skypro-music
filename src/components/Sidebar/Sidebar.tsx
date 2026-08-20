import Image from 'next/image'
import Link from 'next/link'
import UserBlock from '../UserBlock/UserBlock'
import style from './sidebar.module.css'

export default function Sidebar() {
  return (
    <div className={style.main__sidebar}>
      <UserBlock />
      <div className={style.sidebar__block}>
        <div className={style.sidebar__list}>
          <div className={style.sidebar__item}>
            <Link className={style.sidebar__link} href="/music/category/1">
              <Image
                className={style.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={style.sidebar__item}>
            <Link className={style.sidebar__link} href="/music/category/2">
              <Image
                className={style.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={style.sidebar__item}>
            <Link className={style.sidebar__link} href="/music/category/3">
              <Image
                className={style.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
