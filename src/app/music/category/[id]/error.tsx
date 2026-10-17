'use client'

import ErrorBlock from '@/components/features/ErrorBlock/ErrorBlock'

type CategoryErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function CategoryError({ error, reset }: CategoryErrorProps) {
  return (
    <ErrorBlock
      error={{
        title: 'Ошибка загрузки',
        subtitle:
          error.message || 'Не удалось загрузить категорию, попробуйте ещё раз',
      }}
      callback={reset}
    />
  )
}
