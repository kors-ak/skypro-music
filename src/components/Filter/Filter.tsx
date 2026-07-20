import style from './filter.module.css';

export default function Filter() {
  return (
    <div className={style.centerblock__filter}>
      <div className={style.filter__title}>Искать по:</div>
      <div className={style.filter__button}>исполнителю</div>
      <div className={style.filter__button}>году выпуска</div>
      <div className={style.filter__button}>жанру</div>
    </div>
  );
}
