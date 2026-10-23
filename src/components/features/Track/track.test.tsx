import { TrackType } from '@/sharedTypes/sharedTypes'
import {
  setCurrentTrack,
  setIsPlaying,
  setPlaylist,
} from '@/store/features/trackSlice'
import ReduxProvider from '@/store/ReduxProvider'
import { fireEvent, render, screen } from '@testing-library/react'
import Track from './Track'

const track: TrackType = {
  _id: 1,
  name: 'Test Track',
  author: 'Test Artist',
  album: 'Test Album',
  genre: ['Классическая музыка'],
  duration_in_seconds: 180,
  release_date: '2005-06-11',
  logo: null,
  track_file:
    'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Alexander_Nakarada_-_Chase.mp3',
  staredUser: [],
}
const playlist: TrackType[] = [track]

const mockDispatch = jest.fn()
jest.mock('@/store/hooks', () => ({
  ...jest.requireActual('@/store/hooks'),
  useAppDispatch: () => mockDispatch,
}))

const mockToggleLike = jest.fn()
jest.mock('@/hooks/useLikeTrack', () => ({
  useLikeTrack: () => ({
    isLoadingLike: false,
    toggleLike: mockToggleLike,
    isLike: false,
  }),
}))

describe('Track', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    render(
      <ReduxProvider>
        <Track track={track} playlist={playlist} />
      </ReduxProvider>
    )
  })

  it('Отображает название трека, исполнителя и альбом', () => {
    expect(screen.getByText(track.name)).toBeInTheDocument()
    expect(screen.getByText(track.author)).toBeInTheDocument()
    expect(screen.getByText(track.album)).toBeInTheDocument()
  })

  it('Отображает отформатированную длительность трека', () => {
    expect(screen.getByText('3:00')).toBeInTheDocument()
  })

  it('Начинает воспроизведение при клике на трек', () => {
    fireEvent.click(screen.getByText('Test Track'))
    expect(mockDispatch).toHaveBeenCalledWith(setIsPlaying(true))
  })

  it('Устанавливает текущий трек при клике', () => {
    fireEvent.click(screen.getByText('Test Track'))
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentTrack(track))
  })

  it('Устанавливает текущий плейлист плейлист при клике', () => {
    fireEvent.click(screen.getByText('Test Track'))
    expect(mockDispatch).toHaveBeenCalledWith(setPlaylist(playlist))
  })

  it('Вызывает toggleLike при клике по лайку', () => {
    fireEvent.click(screen.getByRole('button'))
    expect(mockToggleLike).toHaveBeenCalledTimes(1)
  })
})
