import { useEffect } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { APP_CHAIN_ID } from '@/libs/configs'
import { isEqual, notice } from '@/utils'
import { authService } from '@/services/auth.service'

export function WalletListener() {
  // __STATE <React.Hooks>
  const { chainId } = useWeb3ReactCore()

  // __EFFECTS <React.Hooks>
  useEffect(() => {
    const provider = window.ethereum || window.BinanceChain
    if (provider) {
      provider.on('accountsChanged', ([account]: string[]) => {
        if (account) {
          authService.setAuthCookies(account)
          authService.getProfile(account)
        } else {
          authService.signout()
        }
      })
    }
  }, [])

  useEffect(() => {
    if (isEqual(chainId, APP_CHAIN_ID)) {
      notice.clear()
    } else {
      notice.error({
        title: 'Network not support!',
        content: '-',
        duration: 0
      })
    }
  }, [chainId])

  // __RENDER
  return null
}
