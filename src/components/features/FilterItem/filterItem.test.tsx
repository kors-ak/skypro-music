import { fireEvent, render, screen } from '@testing-library/react'
import FilterItem from './FilterItem'

const onClick = jest.fn()
const onSelectFilter = jest.fn()
const defaultProps = {
  label: 'исполнителю',
  isOpen: false,
  onClick,
  items: ['Artist 1', 'Artist 2'],
  selectedItems: [] as string[],
  onSelectFilter,
}

describe('FilterItem', () => {
  beforeEach(() => {
    render(<FilterItem {...defaultProps} />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Отображает название фильтра', () => {
    expect(
      screen.getByRole('button', { name: 'исполнителю' })
    ).toBeInTheDocument()
  })

  it('Вызывает onClick при нажатии на кнопку', () => {
    fireEvent.click(screen.getByRole('button', { name: 'исполнителю' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('Отображает список, если фильтр открыт', () => {
    render(<FilterItem {...defaultProps} isOpen={true} />)

    expect(screen.getByText('Artist 1')).toBeInTheDocument()
    expect(screen.getByText('Artist 2')).toBeInTheDocument()
  })

  it('Не отображает список, если фильтр закрыт', () => {
    expect(screen.queryByText('Artist 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Artist 2')).not.toBeInTheDocument()
  })

  it('Вызывает onSelectFilter при выборе пункта', () => {
    render(<FilterItem {...defaultProps} isOpen={true} />)

    fireEvent.click(screen.getByText('Artist 1'))
    expect(onSelectFilter).toHaveBeenCalledWith('Artist 1')
  })

  it('Отображает таб с количеством выбранных исполнителей', () => {
    render(
      <FilterItem {...defaultProps} selectedItems={['Artist 1', 'Artist 2']} />
    )
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
