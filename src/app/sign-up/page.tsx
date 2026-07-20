import cn from 'classnames';
import Link from 'next/link';
import style from './page.module.css';

export default function SignUp() {
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.containerEnter}>
          <div className={style.modal__block}>
            <form className={style.modal__form}>
              <Link href="/">
                <div className={style.modal__logo}>
                  <img src="/img/logo_modal.png" alt="logo" />
                </div>
              </Link>
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
              <div className={style.errorContainer}></div>
              <button className={style.modal__btnSignupEnt}>
                Зарегистрироваться
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
