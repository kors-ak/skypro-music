import Filter from '@/components/Filter/Filter'
import TracksContainer from '@/components/TracksContainer/TracksContainer'
import { getTracks } from '@/services/tracksApi'
import style from './page.module.css'

export default async function HomePage() {
  const tracks = await getTracks()

  return (
    <>
      <h2 className={style.heading}>Треки</h2>

      <Filter tracks={tracks} />

      <TracksContainer tracks={tracks} />
    </>
  )
}
