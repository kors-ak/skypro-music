import axios from 'axios'

export const handleTracksError = (
  error: unknown,
  callback: (message: { title: string; subtitle: string }) => void
) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      callback({
        title:
          error.response.data?.error ||
          error.response.data?.message ||
          'Что-то пошло не так',
        subtitle: 'Обновите страницу и повторите попытку',
      })
    } else if (error.request) {
      callback({
        title: 'Ошибка загрузки',
        subtitle: 'Проверьте подключение к сети и повторите попытку',
      })
    } else {
      callback({
        title: 'Не удалось загрузить треки',
        subtitle: 'Попробуйте повторить попытку',
      })
    }
  }
}

export const handleAuthError = (
  error: unknown,
  callback: (message: string) => void
) => {
  if (!axios.isAxiosError(error)) return

  const status = error.response?.status

  if (status === 401) {
    callback('Неверная почта или пароль')
    return
  }

  if (error.response) {
    callback(
      error.response.data?.error ||
        error.response.data?.message ||
        'Что-то пошло не так, попробуйте позже'
    )
    return
  }

  if (error.request) {
    callback('Нет подключения к интернету')
    return
  }

  callback('Не удалось войти. Попробуйте позже')
}
