import { useCallback, useMemo } from 'react'
import { useWeb3React as useWeb3ReactCore, UnsupportedChainIdError } from '@web3-react/core'
import { NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import { configs } from '@/Constants'
import { AuthService } from '@/Services/auth.service'
import { connectors, dialog, notice, setCookie, removeCookie } from '@/Utils'
import type { Connectors } from '@/Types'

export function useWalletConnection(): CallbackInterface {
  // __STATE <Rect.Hooks>
  const { activate, deactivate } = useWeb3ReactCore()

  // __FUNCTIONS
  const handleConnect = useCallback(
    (connectorName: Connectors) => {
      const connector = connectors[connectorName]

      if (!connector) {
        dialog({
          title: 'Unable to find connector',
          children: 'The connector config is wrong.'
        })

        return void 0
      }

      setCookie(configs.APP_USER_CONNECTOR, connectorName)

      activate(connector, (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          console.error(error)
        } else if (error instanceof UserRejectedRequestError || error.name === 'UserRejectedRequestError') {
          notice.warn({ title: 'Connection Refused', content: 'Please authorize to access your account.' })
        } else if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
          notice.error({ title: 'Provider Error', content: 'No provider was found.' })
        } else {
          notice.warn({ title: 'Something was wrong!', content: 'Please try again.' })
        }

        removeCookie(configs.APP_USER_CONNECTOR)
      })
    },
    [activate]
  )

  const handleDisconnect = useCallback(() => {
    AuthService.signout('/')
    deactivate()
  }, [deactivate])

  // __RETURN
  return useMemo(() => {
    return {
      connect: handleConnect,
      disconnect: handleDisconnect
    }
  }, [handleConnect, handleDisconnect])
}

export interface CallbackInterface {
  connect: (connectorName: Connectors) => void
  disconnect: () => void
}
