import cn from 'classnames'
import Link from 'next/link'
import style from './page.module.css'

export default function Signin() {
  return (
    <>
      <input
        className={cn(style.modal__input, style.login)}
        type="text"
        name="login"
        placeholder="Почта"
      />
      <input
        className={cn(style.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
      />
      <div className={style.errorContainer}>{/*Блок для ошибок*/}</div>
      <button className={style.modal__btnEnter}>Войти</button>
      <Link href={'sign-up'} className={style.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  )
}
