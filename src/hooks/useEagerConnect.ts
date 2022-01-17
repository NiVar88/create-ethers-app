import { useEffect } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { useAuth } from './useAuth'
import { APP_CONNECTOR } from '@/libs/configs'
import { getCookie } from '@/libs/cookies'
import { authService } from '@/services/auth.service'
import { Connectors } from '@/types'
import { notice } from '@/utils'

export function useEagerConnect() {
  // __STATE <Rect.Hooks>
  const { account } = useWeb3ReactCore()
  const { signin } = useAuth()

  // __EFFECTS <React.Hooks>
  useEffect(() => {
    if (account) {
      authService.setAuthCookies(account)
      authService.getProfile(account)
      notice.success({
        title: 'Success',
        content: 'Your wallet connected.'
      })
    } else {
      const connector: Connectors = getCookie(APP_CONNECTOR)
      if (connector) signin(connector)
      else authService.signout()
    }
  }, [account, signin])

  return void 0
}
