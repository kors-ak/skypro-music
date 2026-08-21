'use client'

import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ExitPopup from '../ExitPopup/ExitPopup'
import style from './userBlock.module.css'

export default function UserBlock() {
  const router = useRouter()
  const username = useAppSelector((state) => state.user.username)
  const [confirm, setConfirm] = useState(false)

  return (
    <div className={style.sidebar__personal}>
      <p className={style.sidebar__personalName}>{username}</p>
      {username ? (
        <button
          className={style.sidebar__icon}
          onClick={() => setConfirm(true)}
        >
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </button>
      ) : (
        <button
          className={style.sidebar__icon}
          onClick={() => router.push('/auth/sign-in')}
        >
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#login"></use>
          </svg>
        </button>
      )}

      {confirm && <ExitPopup callback={setConfirm} />}
    </div>
  )
}
