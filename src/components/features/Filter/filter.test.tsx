import { data } from '@/data'
import ReduxProvider from '@/store/ReduxProvider'
import { render, screen } from '@testing-library/react'
import Filter from './Filter'

const tracks = data

describe('Filter', () => {
  it('Соответствует снапшоту', () => {
    const { asFragment } = render(
      <ReduxProvider>
        <Filter tracks={tracks} />
      </ReduxProvider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('Отображает три фильтра', () => {
    render(
      <ReduxProvider>
        <Filter tracks={tracks} />
      </ReduxProvider>
    )

    expect(screen.getByText('исполнителю')).toBeInTheDocument()
    expect(screen.getByText('году выпуска')).toBeInTheDocument()
    expect(screen.getByText('жанру')).toBeInTheDocument()
  })
})
