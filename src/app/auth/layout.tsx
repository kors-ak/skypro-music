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
            <div className={style.modal__logo}>
              <Link href="/music/main">
                <img src="/img/logo_modal.png" alt="logo" />
              </Link>
            </div>

            {children}
          </form>
        </div>
      </div>
    </div>
  )
}
