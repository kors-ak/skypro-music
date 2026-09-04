import axios from 'axios'

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

export const handleTracksError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message || 'Что-то пошло не так, повторите попытку'
  }

  if (error instanceof TypeError) {
    return 'Проверьте подключение к сети и повторите попытку'
  }

  return 'Возникла неизвестная ошибка, повторите попытку'
}
