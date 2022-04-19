import { useCallback, useMemo } from 'react'
import { useWeb3React as useWeb3ReactCore, UnsupportedChainIdError } from '@web3-react/core'
import { NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import { configs } from '@/Constants'
import { AuthService } from '@/Services/auth.service'
import { connectorsBy, dialog, notice, setCookie } from '@/Utils'
import { Connectors } from '@/Types'

export function useAuth() {
  // __STATE <Rect.Hooks>
  const { activate, deactivate } = useWeb3ReactCore()

  // __FUNCTIONS
  const signin = useCallback(
    async (connectorName: Connectors) => {
      const connector = connectorsBy[connectorName]

      if (!connector) {
        dialog({
          title: 'Unable to find connector',
          children: 'The connector config is wrong.'
        })

        return void 0
      }

      activate(connector, (err: Error) => {
        if (err instanceof UnsupportedChainIdError) {
          console.error(err)
        } else if (err instanceof UserRejectedRequestError || err.name === 'UserRejectedRequestError') {
          notice.warn({ title: 'Connection Refused', content: 'Please authorize to access your account.' })
        } else if (err instanceof NoEthereumProviderError || err instanceof NoBscProviderError) {
          notice.error({ title: 'Provider Error', content: 'No provider was found.' })
        } else {
          notice.warn({ title: 'Something was wrong!', content: 'Please try again.' })
        }
      })

      setCookie(configs.APP_USER_CONNECTOR, connectorName)
    },
    [activate]
  )

  const signout = useCallback(() => {
    AuthService.signout('/')
    deactivate()
  }, [deactivate])

  return useMemo(() => ({ signin, signout }), [signin, signout])
}
