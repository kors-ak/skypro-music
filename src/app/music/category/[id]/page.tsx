import CategoryContent from '@/components/features/CategoryContent/CategoryContent'
import { getCategoryTracks } from '@/services/tracksApi'

type CategoryPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params

  const category = await getCategoryTracks(Number(id))

  return <CategoryContent category={category} />
}
