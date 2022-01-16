import { useEffect } from 'react'
import { useAuth } from './useAuth'
import { APP_AUTH, APP_CONNECTOR } from '@/libs/configs'
import { getCookie } from '@/libs/cookies'
import { authService } from '@/services/auth.service'
import { Connectors } from '@/types'

export function useEagerConnect() {
  // __STATE <Rect.Hooks>
  const { active, signin } = useAuth()

  // __EFFECTS <React.Hooks>
  useEffect(() => {
    if (active) {
      const passport: string | null = getCookie(APP_AUTH)
      if (passport) authService.getProfile()
      else authService.signin()
    } else {
      const connector: Connectors = getCookie(APP_CONNECTOR)
      if (connector) signin(connector)
      else authService.signout()
    }
  }, [active, signin])

  return void 0
}
