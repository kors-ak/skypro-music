import cn from 'classnames'
import style from './page.module.css'

export default function SignUp() {
  return (
    <>
      <input
        className={cn(style.modal__input, style.login)}
        type="text"
        name="login"
        placeholder="Почта"
      />
      <input
        className={style.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
      />
      <input
        className={style.modal__input}
        type="password"
        name="password"
        placeholder="Повторите пароль"
      />
      <div className={style.errorContainer}>{/*Блок для ошибок*/}</div>
      <button className={style.modal__btnSignupEnt}>Зарегистрироваться</button>
    </>
  )
}
