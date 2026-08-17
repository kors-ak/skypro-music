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
      callback('Упс, пропал интернет')
    } else {
      callback('Что-то пошло не так, попробуйте позже')
    }
  }
}
