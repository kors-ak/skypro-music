import Link from 'next/link'
import { ReactNode } from 'react'
import style from './layuot.module.css'

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={style.wrapper}>
      <div className={style.containerEnter}>
        <div className={style.modal__block}>
          <form className={style.modal__form}>
            <Link href="/">
              <div className={style.modal__logo}>
                <img src="/img/logo_modal.png" alt="logo" />
              </div>
            </Link>
            {children}
          </form>
        </div>
      </div>
    </div>
  )
}
