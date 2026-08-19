'use client'

import { signupUser } from '@/services/authApi'
import { handleAuthError } from '@/services/errorHandling'
import { FormErrors } from '@/sharedTypes/sharedTypes'
import {
  validateLogin,
  validatePassword,
  validateSecondPassword,
} from '@/utils/validation'
import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import style from './page.module.css'

export default function SignUp() {
  const router = useRouter()
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    secondPassword: '',
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secondPassword, setSecondPassword] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setEmail(value)

    if (isSubmitted) {
      setErrors((prev) => ({
        ...prev,
        email: validateLogin(value),
      }))
    }
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setPassword(value)

    if (isSubmitted) {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value),
      }))
    }
  }

  const handleSecondPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSecondPassword(value)

    if (isSubmitted) {
      setErrors((prev) => ({
        ...prev,
        secondPassword: validateSecondPassword(value, password),
      }))
    }
  }

  const handleSubmit = () => {
    setIsSubmitted(true)

    const newErrors: FormErrors = {
      email: validateLogin(email),
      password: validatePassword(password),
      secondPassword: validateSecondPassword(secondPassword, password),
    }

    setErrors(newErrors)

    if (newErrors.email || newErrors.password || newErrors.secondPassword)
      return

    const username = email.split('@')[0]

    signupUser({ email, username, password })
      .then(() => router.replace('/auth/sign-in'))
      .catch((error) => handleAuthError(error, setApiError))
  }

  return (
    <>
      <input
        className={cn(style.modal__input, style.login)}
        type="email"
        name="email"
        placeholder="Почта"
        value={email}
        onChange={handleLoginChange}
      />
      {errors.email && (
        <div className={style.errorContainer}>{errors.email}</div>
      )}

      <input
        className={style.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={handlePasswordChange}
      />
      {errors.password && (
        <div className={style.errorContainer}>{errors.password}</div>
      )}

      <input
        className={style.modal__input}
        type="password"
        name="password"
        placeholder="Повторите пароль"
        value={secondPassword}
        onChange={handleSecondPasswordChange}
      />
      {errors.secondPassword && (
        <div className={style.errorContainer}>{errors.secondPassword}</div>
      )}

      {apiError && <div className={style.errorContainer}>{apiError}</div>}

      <button
        type="button"
        className={style.modal__btnSignupEnt}
        onClick={handleSubmit}
      >
        Зарегистрироваться
      </button>
    </>
  )
}
