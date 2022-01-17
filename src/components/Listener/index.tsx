import { useCallback, useEffect } from 'react'
import { APP_CHAIN_ID, isMainnet } from '@/libs/configs'
import { authService } from '@/services/auth.service'
import { isEqual, notice, setNetwork } from '@/utils'

export function WalletListener() {
  // __EFFECTS <React.Hooks>
  useEffect(() => {
    const provider = window.ethereum || window.BinanceChain
    if (provider) {
      provider.on('chainChanged', chainChange)
      provider.on('accountsChanged', accountChange)
    }
  }, [])

  // __FUNCTIONS
  const chainChange = useCallback((chainId: string) => {
    if (isEqual(+chainId, APP_CHAIN_ID)) {
      notice.clear()
    } else {
      notice.error({
        title: 'Network not support!',
        content: <SwitchNetwork />,
        duration: 0
      })
    }
  }, [])

  const accountChange = useCallback(([account]: string[]) => {
    if (account) {
      authService.setAuthCookies(account)
      authService.getProfile(account)
    } else {
      authService.signout()
    }
  }, [])

  // __RENDER
  return null
}

export function SwitchNetwork() {
  // __RENDER
  return (
    <div className='ui--notice-network'>
      <p>
        Application is only supported on <b>{isMainnet ? 'Binance Smart Chain' : 'BSC Testnet'}</b>
      </p>

      <p>
        Switch Network:{' '}
        <button className='btn btn-text btn-switch' onClick={setNetwork}>
          <span className='text'>Click here</span>
        </button>
      </p>
    </div>
  )
}
