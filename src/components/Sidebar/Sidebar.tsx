import { getCategories } from '@/services/tracksApi'
import Image from 'next/image'
import Link from 'next/link'
import style from './sidebar.module.css'

const cateroriesError = {
  _id: 0,
  name: 'Не удалось загрузить категории',
  items: [],
  owner: [],
  __v: 0,
}

export default async function Sidebar() {
  const categories = await getCategories()
    .then((res) => res.filter((cat) => cat.items.length > 0))
    .catch((error) => {
      console.error(error)
      return [cateroriesError]
    })

  return (
    <div className={style.sidebar__block}>
      <div className={style.sidebar__list}>
        {[...categories].reverse().map((category) => (
          <div className={style.sidebar__item} key={category._id}>
            {category._id === 0 ? (
              <div className={style.error}>{category.name}</div>
            ) : (
              <Link
                className={style.sidebar__link}
                href={`/music/category/${category._id - 1}`}
              >
                <Image
                  className={style.sidebar__img}
                  src={`/img/playlist0${category._id - 1}.png`}
                  alt={category.name || ''}
                  width={250}
                  height={150}
                  loading="eager"
                  unoptimized
                />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
