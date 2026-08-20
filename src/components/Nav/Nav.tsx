'use client'

import { useAppSelector } from '@/store/hooks'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import ExitPopup from '../ExitPopup/ExitPopup'
import style from './nav.module.css'

export default function Nav() {
  const username = useAppSelector((state) => state.user.username)
  const [isOpen, setIsOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)

  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <nav className={cn(style.main__nav, isOpen && style.main__nav_active)}>
      <Link href={'/music/main'} className={style.nav__logo}>
        <Image
          width={250}
          height={170}
          className={style.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </Link>
      <div className={style.nav__burger} onClick={handleMenuToggle}>
        <span className={style.burger__line}></span>
        <span className={style.burger__line}></span>
        <span className={style.burger__line}></span>
      </div>
      <div className={cn(style.menuWrapper, isOpen && style.menuWrapperOpen)}>
        <div className={style.nav__menu}>
          <ul className={style.menu__list}>
            <li className={style.menu__item}>
              <Link href="/music/main" className={style.menu__link}>
                Главное
              </Link>
            </li>
            <li className={style.menu__item}>
              <Link href="#" className={style.menu__link}>
                Мои треки
              </Link>
            </li>
            <li className={style.menu__item}>
              {username ? (
                <p
                  className={style.menu__link}
                  onClick={() => setConfirm(true)}
                >
                  Выйти
                </p>
              ) : (
                <Link href="/auth/sign-in" className={style.menu__link}>
                  Войти
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      {confirm && <ExitPopup callback={setConfirm} />}
    </nav>
  )
}
