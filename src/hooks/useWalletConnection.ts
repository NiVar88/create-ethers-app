import { useCallback, useMemo } from 'react'
import { useWeb3React as useWeb3ReactCore, UnsupportedChainIdError } from '@web3-react/core'
import { NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector'
import { configs, Connectors, ModalName } from '@/constants'
import { AuthService } from '@/services'
import { connectors, dialog, modal, notice } from '@/utils'
import { storage } from '@/utils/storage'

export function useWalletConnection(): CallbackInterface {
  // __STATE <Rect.Hooks>
  const { account, activate, deactivate } = useWeb3ReactCore()

  // __FUNCTIONS
  const handleConnect = useCallback(
    (connectorName: Connectors, deps?: boolean) => {
      const connector = connectors[connectorName]

      if (!connector) {
        dialog('The connector config is wrong.', { title: 'Unable to find connector' })
        return void 0
      }

      storage.set(configs.APP_USER_CONNECTOR, connectorName)

      if (!deps) {
        modal.off('sign-in')
        notice.info({
          vid: 'connecting',
          title: 'Wallet Connection',
          content: 'Connecting to your wallet...',
          duration: 0
        })
      }

      activate(connector, (error: Error) => {
        notice.close('connecting')

        if (error instanceof UnsupportedChainIdError) {
          console.error(error)
        } else if (error instanceof UserRejectedRequestError || error.name === 'UserRejectedRequestError') {
          notice.warn({ title: 'Connection Refused', content: 'Please authorize to access your account.' })
        } else if (error instanceof NoEthereumProviderError) {
          notice.error({ title: 'Provider Error', content: 'No provider was found.' })
        } else {
          notice.warn({ title: 'Something was wrong!', content: error.name || 'Please try again.' })
        }

        storage.remove(configs.APP_USER_CONNECTOR)
      })
    },
    [activate]
  )

  const handleDisconnect = useCallback(
    (redirectTo?: string) => {
      AuthService.signout(redirectTo)
      deactivate()
    },
    [deactivate]
  )

  const handleModalConnect = useCallback(() => {
    if (!account) {
      modal.on(ModalName.CONNECT_WALLET, { className: 'sign-in' })
    }
  }, [account])

  // __RETURN
  return useMemo(() => {
    return {
      connect: handleConnect,
      disconnect: handleDisconnect,
      modal: handleModalConnect
    }
  }, [handleConnect, handleDisconnect, handleModalConnect])
}

export interface CallbackInterface {
  connect: (connectorName: Connectors, deps?: boolean) => void
  disconnect: (redirectTo?: string) => void
  modal: () => void
}
