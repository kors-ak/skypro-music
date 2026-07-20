import { tracks } from '@/data';
import cn from 'classnames';
import Track from '../Track/Track';
import style from './trackscontainer.module.css';

export default function TracksContainer() {
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
        {tracks.map((track) => (
          <Track key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
