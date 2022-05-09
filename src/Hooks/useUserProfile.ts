import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '@/Store'

export function useUserProfile() {
  // __STATE <React.Hooks>
  const user = useSelector(userSelector.getProfile)

  // __RETURN
  return useMemo(() => user, [user])
}
