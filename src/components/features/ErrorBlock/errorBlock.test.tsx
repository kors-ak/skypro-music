import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorBlock from './ErrorBlock'

const error = {
  title: 'Ошибка загрузки',
  subtitle: 'Проверьте подключение к интернету',
}

describe('ErrorBlock', () => {
  it('Соответсвут снапшоту', () => {
    const { asFragment } = render(
      <ErrorBlock error={error} callback={() => {}} />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('Отображает заголовок ошибки', () => {
    render(<ErrorBlock error={error} callback={() => {}} />)

    expect(
      screen.getByRole('heading', {
        name: error.title,
      })
    ).toBeInTheDocument()
  })

  it('Отображает подзаголовок ошибки', () => {
    render(<ErrorBlock error={error} callback={() => {}} />)

    expect(screen.getByText(error.subtitle)).toBeInTheDocument()
  })

  it('Вызывает переданный callback при нажатии на кнопку', async () => {
    const user = userEvent.setup()
    const callback = jest.fn()

    render(<ErrorBlock error={error} callback={callback} />)

    await user.click(screen.getByRole('button', { name: 'Повторить' }))

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('Вызывает асинхронный callback при нажатии', async () => {
    const user = userEvent.setup()
    const callback = jest.fn().mockResolvedValue(undefined)

    render(<ErrorBlock error={error} callback={callback} />)

    await user.click(screen.getByRole('button', { name: 'Повторить' }))

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
