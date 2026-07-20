import Filter from '../Filter/Filter';
import Search from '../Search/Search';
import TracksContainer from '../TracksContainer/TracksContainer';
import style from './centerblock.module.css';

export default function CenterBlock() {
  return (
    <div className={style.centerblock}>
      <Search />

      <h2 className={style.centerblock__h2}>Треки</h2>

      <Filter />

      <TracksContainer />
    </div>
  );
}
