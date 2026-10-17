'use client'

import {
  setAccessToken,
  setRefreshToken,
  setUserInitialized,
  setUserName,
} from '@/store/features/userSlice'
import { useAppDispatch } from '@/store/hooks'
import { useEffect } from 'react'

export default function UserInitializer() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const username = localStorage.getItem('username') || ''
    const access = localStorage.getItem('access') || ''
    const refresh = localStorage.getItem('refresh') || ''

    dispatch(setUserName(username))
    dispatch(setAccessToken(access))
    dispatch(setRefreshToken(refresh))
    dispatch(setUserInitialized(true))
  }, [dispatch])

  return null
}
