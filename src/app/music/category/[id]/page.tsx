import CategoryContent from '@/components/features/CategoryContent/CategoryContent'
import { getCategoryTraks } from '@/services/tracksApi'

type CategoryPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params

  const category = await getCategoryTraks(Number(id))

  return <CategoryContent category={category} />
}
