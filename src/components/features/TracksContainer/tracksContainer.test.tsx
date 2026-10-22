import { data } from '@/data'
import ReduxProvider from '@/store/ReduxProvider'
import { render, screen } from '@testing-library/react'
import TracksContainer from './TracksContainer'

jest.mock('../Track/Track', () => {
  return function MockTrack({ track }: { track: { name: string } }) {
    return <div data-testid="track">{track.name}</div>
  }
})

const tracks = [data[0], data[1], data[2]]

describe('TracksContainer', () => {
  it('Соответствует снапшоту', () => {
    const { asFragment } = render(
      <ReduxProvider>
        <TracksContainer tracks={tracks} playlistId="0" />
      </ReduxProvider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('Отображает список треков', () => {
    render(
      <ReduxProvider>
        <TracksContainer tracks={tracks} playlistId="0" />
      </ReduxProvider>
    )

    expect(screen.getByText('Chase')).toBeInTheDocument()
    expect(screen.getByText('Open Sea epic')).toBeInTheDocument()
    expect(screen.getByText('Sneaky Snitch')).toBeInTheDocument()
  })

  it('Отображает верное количество треков', () => {
    render(
      <ReduxProvider>
        <TracksContainer tracks={tracks} playlistId="0" />
      </ReduxProvider>
    )

    expect(screen.getAllByTestId('track')).toHaveLength(3)
  })

  it('Отображает сообщение, если список пуст', () => {
    render(
      <ReduxProvider>
        <TracksContainer tracks={[]} playlistId="0" />
      </ReduxProvider>
    )

    expect(screen.getByText('Список треков пока пуст')).toBeInTheDocument()
  })
})
