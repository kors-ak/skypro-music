import { TrackType } from '@/sharedTypes/sharedTypes'

export function getUniqueTrackValues(
  arr: TrackType[],
  key: keyof TrackType
): string[] {
  const uniqueValues = new Set<string>()

  arr.forEach((track) => {
    const value = track[key]

    if (Array.isArray(value)) {
      value.forEach((el) => {
        if (el) uniqueValues.add(el)
      })
    } else if (typeof value === 'string') {
      uniqueValues.add(value)
    }
  })

  return Array.from(uniqueValues)
}
