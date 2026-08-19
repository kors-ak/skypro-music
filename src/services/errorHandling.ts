import axios from 'axios'

export const handleTasksError = (
  error: unknown,
  callback: (message: string) => void
) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      callback(
        error.response.data?.error ||
          error.response.data?.message ||
          'Что-то пошло не так, попробуйте позже'
      )
    } else if (error.request) {
      callback('Нет подключения к интернету')
    } else {
      callback('Не удалось загрузить музыку, попробуйте позже')
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
