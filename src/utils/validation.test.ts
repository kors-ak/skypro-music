import {
  validateLogin,
  validatePassword,
  validateSecondPassword,
} from './validation'

describe('Валидация входа и регистрации', () => {
  describe('Валидация логина', () => {
    it('Не выдает ошибок при валидной почте', () => {
      expect(validateLogin('test@test.ru')).toBe('')
      expect(validateLogin('user@example.com')).toBe('')
    })

    it('Возвращает текст ошибки при пустом поле почты', () => {
      expect(validateLogin('')).toBe('Введите почту')
      expect(validateLogin('   ')).toBe('Введите почту')
    })

    it('Возвращает текст ошибки при неверном формате почты', () => {
      expect(validateLogin('ab@example.com')).toBe('Проверьте формат почты')
      expect(validateLogin('userexample.com')).toBe('Проверьте формат почты')
      expect(validateLogin('user@@example.com')).toBe('Проверьте формат почты')
      expect(validateLogin('user@example..com')).toBe('Проверьте формат почты')
      expect(validateLogin('us er@example.com')).toBe('Проверьте формат почты')
    })
  })

  describe('Валидация пароля', () => {
    it('Не выдает ошибку при валидном пароле', () => {
      expect(validatePassword('qwerty1234')).toBe('')
      expect(validatePassword('1_?Qq@23')).toBe('')
    })

    it('Возвращает текст ошибки при пустом поле пароля', () => {
      expect(validatePassword('')).toBe('Введите пароль')
      expect(validatePassword('    ')).toBe('Введите пароль')
    })

    it('Возвращает текст ошибки при пароле короче 8-ми символов', () => {
      expect(validatePassword('1')).toBe('Минимум 8 символов')
      expect(validatePassword('qwe123  ')).toBe('Минимум 8 символов')
    })
  })

  describe('Валидация повторения парроля', () => {
    it('Не выдает ошибку при валидном пароле', () => {
      expect(validateSecondPassword('qwerty1234', 'qwerty1234')).toBe('')
      expect(validateSecondPassword('1_?Qq@23', '1_?Qq@23')).toBe('')
    })

    it('Возвращает текст ошибки при пустом поле пароля', () => {
      expect(validateSecondPassword('', 'qwerty1234')).toBe('Повторите пароль')
      expect(validateSecondPassword('', '')).toBe('Повторите пароль')
      expect(validateSecondPassword('   ', 'qwerty1234')).toBe(
        'Повторите пароль'
      )
    })

    it('Возвращает текст ошибки, если пороли не совпадают', () => {
      expect(validateSecondPassword('фывафыва1234', 'qwerty1234')).toBe(
        'Пароли не совпадают'
      )
      expect(validateSecondPassword('11223344', '44332211')).toBe(
        'Пароли не совпадают'
      )
    })
  })
})
