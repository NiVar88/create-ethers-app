import { useCallback, useMemo } from 'react'
import { configs } from '@/Constants'
import { AuthService } from '@/Services/auth.service'
import { notice, getCookie } from '@/Utils'
import { Connectors } from '@/Types'
import { useAuth } from './useAuth'

export function useEagerConnect() {
  // __STATE <Rect.Hooks>
  const { signin } = useAuth()

  // __FUNCTIONS
  const func = useCallback(
    async (account?: string | null) => {
      if (account) {
        const refreshToken = getCookie(configs.APP_AUTH_REFRESH)

        if (refreshToken) {
          await AuthService.getProfile(account)
        } else {
          await AuthService.signin(account)
        }

        notice.success({
          title: 'Success',
          content: 'Your wallet connected.'
        })
      } else {
        const connector: Connectors = getCookie(configs.APP_USER_CONNECTOR)
        if (connector) signin(connector)
        else AuthService.signout()
      }
    },
    [signin]
  )

  // __RETURN
  return useMemo(() => [func], [func])
}
