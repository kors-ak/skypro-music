import Link from 'next/link';
import style from './track.module.css';

type TrackProps = {
  track: {
    title: string;
    author: string;
    album: string;
    time: string;
  };
};

export default function Track({ track }: TrackProps) {
  return (
    <div className={style.playlist__item}>
      <div className={style.playlist__track}>
        <div className={style.track__title}>
          <div className={style.track__titleImage}>
            <svg className={style.track__titleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div>
            <Link className={style.track__titleLink} href="">
              {track.title} <span className={style.track__titleSpan}></span>
            </Link>
          </div>
        </div>
        <div className={style.track__author}>
          <Link className={style.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={style.track__album}>
          <Link className={style.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div>
          <svg className={style.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={style.track__timeText}>{track.time}</span>
        </div>
      </div>
    </div>
  );
}
