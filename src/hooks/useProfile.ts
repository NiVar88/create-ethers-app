import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '@/store'
import type { User } from '@/types'

export function useProfile() {
  // __STATE <React.Hooks>
  const [state, setState] = useState<User | null>(null)
  const user = useSelector(userSelector.getProfile)

  // __EFFECTS
  useEffect(() => {
    if (user) setState(user)
  }, [user])

  // __RETURN
  return useMemo(() => state, [state])
}
