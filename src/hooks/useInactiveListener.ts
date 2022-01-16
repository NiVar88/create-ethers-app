import { useEffect, useCallback, useMemo } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { APP_CHAIN_ID, USER_ADDRESS } from '@/libs/configs'
import { getCookie } from '@/libs/cookies'
import { authService } from '@/services/auth.service'
import { notice } from '@/utils'
import { ChainId } from '@/types'

export function useInactiveListener() {
  // __STATE <Rect.Hooks>
  const { account, active } = useWeb3ReactCore()
  const provider = useMemo(() => window.ethereum, [])

  // __EFFECTS <React.Hooks>
  useEffect(() => {
    if (provider) {
      const chainId = provider.chainId || provider.networkVersion
      if (chainId) {
        handleChainChange(chainId)
      }
    }
  }, [account])

  useEffect(() => {
    if (provider) {
      provider.on('chainChanged', handleChainChange)
      provider.on('accountsChanged', handleAccountsChange)

      return () => {
        provider.removeListener('chainChanged', handleChainChange)
        provider.removeListener('accountsChanged', handleAccountsChange)
      }
    }
  }, [active])

  // __FUNCTIONS
  const handleChainChange = useCallback((chainkId: string) => {
    if (APP_CHAIN_ID !== +chainkId) {
      const message = {
        [ChainId.BSC]: 'Binance Smart Chain Network',
        [ChainId.BSC_TESTNET]: 'BSC Testnet'
      }[APP_CHAIN_ID]

      notice.warn({
        title: 'Network not support!',
        content: `{PROJECT} is only supported on <b>${message}</b>.<br />Please confirm you installed <b>Metamask</b> and selected <b>${message}</b>.`,
        duration: 0
      })
    } else {
      notice.clear()
    }
  }, [])

  const handleAccountsChange = useCallback((accounts: string[]) => {
    if (accounts.length) {
      const currentAccount = getCookie(USER_ADDRESS)
      if (currentAccount) {
        if (currentAccount !== accounts[0]) {
          authService.signin()
        } else {
          authService.getProfile()
        }
      }
    } else {
      authService.signout()
    }
  }, [])

  return void 0
}
