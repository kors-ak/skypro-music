import { setUser } from '@/store/features/userSlice'
import { useAppDispatch } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import style from './ExitPopup.module.css'

type ExitPopupProps = {
  callback: (a: boolean) => void
}

export default function ExitPopup({ callback }: ExitPopupProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const exit = () => {
    dispatch(setUser({ username: null, id: null }))
    localStorage.removeItem('username')
    localStorage.removeItem('id')
    router.replace('/auth/sign-in')
  }

  return (
    <div className={style.overlay} onClick={() => callback(false)}>
      <div className={style.exit__popup} onClick={(e) => e.stopPropagation()}>
        <h3 className={style.exit__title}>Вы действительно хотите выйти?</h3>
        <div className={style.exit__choice}>
          <button className={style.exit__no} onClick={() => callback(false)}>
            Остаться
          </button>
          <button className={style.exit__yes} onClick={exit}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  )
}
