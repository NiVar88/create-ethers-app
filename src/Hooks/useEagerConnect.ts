import { useEffect } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { useAuth } from './useAuth'
import { configs } from '@/Constants'
import { AuthService } from '@/Services/auth.service'
import { Connectors } from '@/Types'
import { notice, getCookie } from '@/Utils'

export function useEagerConnect() {
  // __STATE <Rect.Hooks>
  const { account } = useWeb3ReactCore()
  const { signin } = useAuth()

  // __EFFECTS <React.Hooks>
  useEffect(() => {
    if (account) {
      AuthService.setAuthCookies(account)
      AuthService.getProfile(account)
      notice.success({
        title: 'Success',
        content: 'Your wallet connected.'
      })
    } else {
      const connector: Connectors = getCookie(configs.APP_USER_CONNECTOR)
      if (connector) signin(connector)
      else AuthService.signout()
    }
  }, [account, signin])

  return void 0
}
