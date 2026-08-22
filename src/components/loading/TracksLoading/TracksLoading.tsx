import FilterItem from '@/components/FilterItem/FilterItem'
import cn from 'classnames'
import style from './tracksLoading.module.css'

const quantity = Math.floor(Math.random() * 8)

export default function TracksLoading() {
  return (
    <>
      <div className={cn(style.sceleton, style.heading)} />

      <div className={style.centerblock__filter}>
        <div className={style.filter__title}>Искать по:</div>
        <FilterItem label="исполнителю" isOpen={false} items={[]} />
        <FilterItem label="году выпуска" isOpen={false} items={[]} />
        <FilterItem label="жанру" isOpen={false} items={[]} />
      </div>

      <div className={style.centerblock__content}>
        <div className={style.content__title}>
          <div className={cn(style.playlistTitle__col, style.col01)}>Трек</div>
          <div className={cn(style.playlistTitle__col, style.col02)}>
            Исполнитель
          </div>
          <div className={cn(style.playlistTitle__col, style.col03)}>
            Альбом
          </div>
          <div className={cn(style.playlistTitle__col, style.col04)}>
            <svg className={style.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>

        <div className={style.content__playlist}>
          {Array.from({ length: quantity }).map((_, index) => (
            <div className={style.playlist__item} key={index}>
              <div className={style.playlist__track}>
                <div className={style.track__title}>
                  <div
                    className={cn(style.sceleton, style.track__titleImage)}
                  />

                  <div className={style.track__titleLink} />
                </div>

                <div className={style.track__author} />

                <div className={style.track__additional} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
