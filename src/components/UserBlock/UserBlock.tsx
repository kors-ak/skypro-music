'use client'

import { useAppSelector } from '@/store/hooks'
import { useState } from 'react'
import ExitPopup from '../ExitPopup/ExitPopup'
import style from './userBlock.module.css'

export default function UserBlock() {
  const username = useAppSelector((state) => state.user.username)
  const [confirm, setConfirm] = useState(false)

  return (
    <div className={style.sidebar__personal}>
      <p className={style.sidebar__personalName}>{username}</p>
      <button className={style.sidebar__icon} onClick={() => setConfirm(true)}>
        <svg>
          {username ? (
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          ) : (
            <use xlinkHref="/img/icon/sprite.svg#login"></use>
          )}
        </svg>
      </button>

      {confirm && <ExitPopup callback={setConfirm} />}
    </div>
  )
}
