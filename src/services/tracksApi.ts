import { TrackType } from '@/sharedTypes/sharedTypes'
import { BASE_URL } from './constants'

type CategoryType = {
  _id: number
  name: string
  items: number[]
  owner: number[]
  __v: number
}

export const getTracks = (): Promise<TrackType[]> => {
  return fetch(`${BASE_URL}/catalog/track/all/`, {
    next: {
      revalidate: 3600,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить треки')
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
