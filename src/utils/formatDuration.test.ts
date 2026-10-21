import { formatDuration } from './formatDuration'

describe('Форматирование длительности трека', () => {
  it('Значение менее часа', () => {
    expect(formatDuration(25)).toBe('0:25')
    expect(formatDuration(75)).toBe('1:15')
    expect(formatDuration(3599)).toBe('59:59')
  })

  it('Значение 1 час и более', () => {
    expect(formatDuration(3600)).toBe('1:00:00')
    expect(formatDuration(3661)).toBe('1:01:01')
    expect(formatDuration(7322)).toBe('2:02:02')
  })

  it('Значение ровно одна минута', () => {
    expect(formatDuration(60)).toBe('1:00')
  })

  it('Значение ровно ноль секунд', () => {
    expect(formatDuration(0)).toBe('0:00')
  })
})
