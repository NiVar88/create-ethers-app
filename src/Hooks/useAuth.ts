import { useCallback, useEffect, useMemo, useState } from 'react'
import { useWeb3React as useWeb3ReactCore, UnsupportedChainIdError } from '@web3-react/core'
import { NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import { configs } from '@/Constants'
import { AuthService } from '@/Services/auth.service'
import { connectorsBy, dialog, notice, setCookie } from '@/Utils'
import { Connectors } from '@/Types'

export function useAuth() {
  // __STATE <Rect.Hooks>
  const { active, activate, deactivate } = useWeb3ReactCore()
  const [state, setState] = useState<Connectors>()

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

      setState(connectorName)
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
    },
    [activate]
  )

  const signout = useCallback(() => {
    AuthService.signout()
    deactivate()
  }, [deactivate])

  // __EFFECTS
  useEffect(() => {
    if (active && state) {
      setCookie(configs.APP_USER_CONNECTOR, state)
    }
  }, [active, state])

  return useMemo(() => ({ signin, signout }), [signin, signout])
}
