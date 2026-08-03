'use client'

import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import style from './nav.module.css'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <nav className={cn(style.main__nav, isOpen && style.main__nav_active)}>
      <div className={style.nav__logo}>
        <Image
          width={250}
          height={170}
          className={style.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>
      <div className={style.nav__burger} onClick={handleMenuToggle}>
        <span className={style.burger__line}></span>
        <span className={style.burger__line}></span>
        <span className={style.burger__line}></span>
      </div>
      <div
        className={`${style.menuWrapper} ${isOpen ? style.menuWrapperOpen : ''}`}
      >
        <div className={style.nav__menu}>
          <ul className={style.menu__list}>
            <li className={style.menu__item}>
              <Link href="#" className={style.menu__link}>
                Главное
              </Link>
            </li>
            <li className={style.menu__item}>
              <Link href="#" className={style.menu__link}>
                Мои треки
              </Link>
            </li>
            <li className={style.menu__item}>
              <Link href="../signin.html" className={style.menu__link}>
                Войти
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
