import { data } from '../data'
import { getUniqueTrackValues } from './getUniqueTrackValues'

const mockTracks = data

describe('Получение уникальных значений из треков', () => {
  it('Уникальные авторы', () => {
    expect(getUniqueTrackValues(mockTracks, 'author')).toEqual([
      'Alexander Nakarada',
      'Frank Schroter',
      'Kevin Macleod',
      'Mixkit',
      '-',
      'Waltz Piano',
      'Winniethemoog',
    ])
    expect(getUniqueTrackValues([mockTracks[0]], 'author')).toEqual([
      'Alexander Nakarada',
    ])
  })

  it('Уникальные жанры', () => {
    expect(getUniqueTrackValues(mockTracks, 'genre')).toEqual([
      'Классическая музыка',
      'Рок музыка',
    ])
    expect(
      getUniqueTrackValues([mockTracks[0], mockTracks[2]], 'genre')
    ).toEqual(['Классическая музыка'])
  })

  it('Список треков пуст', () => {
    expect(getUniqueTrackValues([], 'author')).toEqual([])
    expect(getUniqueTrackValues([], 'genre')).toEqual([])
  })
})
