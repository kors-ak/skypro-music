import { TrackType } from '@/sharedTypes/sharedTypes'
import { resetFilter } from '@/store/features/trackSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import cn from 'classnames'
import { useEffect } from 'react'
import Track from '../Track/Track'
import style from './trackscontainer.module.css'

type TracksContainerProps = {
  tracks: TrackType[]
  playlistId: string
}

export default function TracksContainer({
  tracks,
  playlistId,
}: TracksContainerProps) {
  const filter = useAppSelector((state) => state.tracks.filter)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetFilter())
  }, [dispatch, playlistId])

  const filteredTracks = [...tracks]
    .filter((track) => {
      const authorMatch =
        filter.authors.length === 0 || filter.authors.includes(track.author)
      const genreMatch =
        filter.genre.length === 0 ||
        filter.genre.some((genre) => track.genre.includes(genre))

      return authorMatch && genreMatch
    })
    .sort((a, b) => {
      if (filter.age === 'По умолчанию') {
        return 0
      } else if (filter.age === 'Сначала новые') {
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        )
      } else if (filter.age === 'Сначала старые') {
        return (
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
        )
      }
      return 0
    })

  return (
    <div className={style.centerblock__content}>
      <div className={style.content__title}>
        <div className={cn(style.playlistTitle__col, style.col01)}>Трек</div>
        <div className={cn(style.playlistTitle__col, style.col02)}>
          Исполнитель
        </div>
        <div className={cn(style.playlistTitle__col, style.col03)}>Альбом</div>
        <div className={cn(style.playlistTitle__col, style.col04)}>
          <svg className={style.playlistTitle__svg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
          </svg>
        </div>
      </div>
      <div className={style.content__playlist}>
        {filteredTracks.length ? (
          filteredTracks.map((track) => (
            <Track key={track._id} track={track} playlist={filteredTracks} />
          ))
        ) : (
          <p className={style.content__playlistEmpty}>
            {filter.authors.length === 0 && filter.genre.length === 0
              ? 'Список треков пока пуст'
              : 'Не удалось найти треки, соответствующие данным фильтрам'}
          </p>
        )}
      </div>
    </div>
  )
}
