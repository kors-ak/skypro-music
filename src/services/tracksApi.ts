import { CategoryType, TrackType } from '@/sharedTypes/sharedTypes'
import { BASE_URL } from './constants'

export const getTracks = (): Promise<TrackType[]> => {
  return fetch(`${BASE_URL}/catalog/track/all/`, {
    next: {
      revalidate: 3600,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Не удалось загрузить треки')
      }

      return response.json()
    })
    .then((res) => res.data)
}

export const getCategoryTraks = (id: number): Promise<CategoryType> => {
  return fetch(`${BASE_URL}/catalog/selection/${++id}/`, {
    next: {
      revalidate: 3600,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить категорию')
      }

      return response.json()
    })
    .then((res) => res.data)
}

export const getCategories = (): Promise<CategoryType[]> => {
  return fetch(`${BASE_URL}/catalog/selection/all/`, {
    next: {
      revalidate: 3600,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить категории')
      }

      return response.json()
    })
    .then((res) => res.data)
}
