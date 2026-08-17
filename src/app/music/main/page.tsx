import Filter from '@/components/Filter/Filter'
import TracksContainer from '@/components/TracksContainer/TracksContainer'
import style from './page.module.css'

export default function HomePage() {
  return (
    <>
      <h2 className={style.heading}>Треки</h2>

      <Filter />

      <TracksContainer />
    </>
  )
}
