import Filter from '@/components/Filter/Filter'
import TracksContainer from '@/components/TracksContainer/TracksContainer'
import { getCategoryTraks, getTracks } from '@/services/tracksApi'
import style from './page.module.css'

type CategoryPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params

  const [tracks, category] = await Promise.all([
    getTracks(),
    getCategoryTraks(Number(id)),
  ])

  const categoryTracks = tracks.filter((track) =>
    category.items.includes(track._id)
  )

  return (
    <>
      <h2 className={style.heading}>{category.name}</h2>

      <Filter tracks={categoryTracks} />

      <TracksContainer tracks={categoryTracks} />
    </>
  )
}
