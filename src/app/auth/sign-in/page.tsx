'use client'

import { loginUser } from '@/services/authApi'
import { handleAuthError } from '@/services/errorHandling'
import { FormErrors } from '@/sharedTypes/sharedTypes'
import { setUser } from '@/store/features/userSlice'
import { useAppDispatch } from '@/store/hooks'
import { validateLogin, validatePassword } from '@/utils/validation'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import style from './page.module.css'

export default function Signin() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [apiError, setApiError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setEmail(value)
    setApiError('')

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
    setApiError('')

    if (isSubmitted) {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value),
      }))
    }
  }

  const handleSubmit = () => {
    setIsSubmitted(true)

    const newErrors: FormErrors = {
      email: validateLogin(email),
      password: validatePassword(password),
    }

    setErrors(newErrors)

    if (newErrors.email || newErrors.password) return

    setIsLoading(true)

    loginUser({ email, password })
      .then((data) => {
        dispatch(setUser({ username: data.username, id: data._id }))
        localStorage.setItem('username', data.username)
        localStorage.setItem('id', String(data._id))
      })
      .then(() => router.replace('/music/main'))
      .catch((error) => handleAuthError(error, setApiError))
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <input
        className={cn(style.modal__input, style.email)}
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
        className={cn(style.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={handlePasswordChange}
      />
      {errors.password && (
        <div className={style.errorContainer}>{errors.password}</div>
      )}

      {apiError && <div className={style.errorContainer}>{apiError}</div>}

      <button
        type="button"
        className={style.modal__btnEnter}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        Войти
      </button>
      <Link href={'sign-up'} className={style.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  )
}
