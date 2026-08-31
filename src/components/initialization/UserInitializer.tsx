'use client'

import { setUser } from '@/store/features/userSlice'
import { useAppDispatch } from '@/store/hooks'
import { useEffect } from 'react'

export default function UserInitializer() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const username = localStorage.getItem('username')
    const id = localStorage.getItem('id')

    if (username && id) {
      dispatch(
        setUser({
          username,
          id: Number(id),
        })
      )
    }
  }, [dispatch])

  return null
}
