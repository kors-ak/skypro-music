export type TrackType = {
  _id: number
  name: string
  author: string
  release_date: string
  genre: string[]
  duration_in_seconds: number
  album: string
  logo: {
    type: string
    data: number[]
  } | null
  track_file: string
  staredUser: number[]
}

export type FormErrors = {
  email: string
  password: string
  username?: string
  secondPassword?: string
}
