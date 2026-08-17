import { TrackType } from '@/sharedTypes/sharedTypes'
import axios from 'axios'
import { BASE_URL } from './constants'

type CategoryType = {
  _id: number
  name: string
  items: number[]
  owner: number[]
  __v: number
}

export const getTracks = async (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all/').then((res) => res.data.data)
}

export const getCategoryTraks = async (id: number): Promise<CategoryType> => {
  return axios(BASE_URL + `/catalog/selection/${++id}/`).then(
    (res) => res.data.data
  )
}
