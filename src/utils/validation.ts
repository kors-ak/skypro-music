export const EMAIL_REGEX = /^[^\s@]{3,}@[^\s@]+\.[^\s@]+$/

export const validateLogin = (value: string) => {
  const emailValue = value.trim()

  if (!emailValue) return 'Введите почту'

  if (!EMAIL_REGEX.test(emailValue)) {
    return 'Проверьте формат почты'
  }

  return ''
}

export const validatePassword = (value: string) => {
  const password = value.trim()

  if (!password) return 'Введите пароль'

  if (password.length < 8) {
    return 'Минимум 8 символов'
  }

  return ''
}

export const validateSecondPassword = (
  value: string,
  firstPassword: string
) => {
  const password = value.trim()

  if (!password) return 'Повторите пароль'

  if (password !== firstPassword) {
    return 'Пароли не совпадают'
  }

  return ''
}
