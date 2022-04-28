import { useEffect, useState } from 'react'
import { configs } from '@/Constants'
import { useWeb3ReactCore, useFetchCurrencyBalance, useWalletConnection, useTheme } from '@/Hooks'
import { AuthService } from '@/Services/auth.service'
import { getCookie } from '@/Utils'
import { Connectors } from '@/Types'
import { getCurrentConnector } from '@/Utils/ethers'

export function WatcherContainer() {
  // __STATE <React.Hooks>
  const { account } = useWeb3ReactCore()
  const { connect } = useWalletConnection()

  const [onFetchBalance] = useFetchCurrencyBalance()
  const [started, setStarted] = useState<any[]>([])

  useTheme()

  // __EFFECTS
  useEffect(() => {
    if (account) {
      if (getCookie(configs.APP_AUTH_REFRESH)) {
        AuthService.getProfile(account)
      } else {
        AuthService.signin(account)
      }
    } else {
      const connector: Connectors = getCookie(configs.APP_USER_CONNECTOR)
      if (connector) connect(connector)
      else AuthService.signout()
    }
  }, [account, connect])

  useEffect(() => {
    const connector = getCurrentConnector()
    if (connector && !started[1]) {
      const { BinanceChain: binance, ethereum } = window
      const accountListener = (accounts: string[]) => {
        if (accounts.length) {
          AuthService.signin(accounts[0])
        }
      }

      switch (connector) {
        case Connectors.BSC:
          binance?.on('chainChanged', () => location.reload())
          binance?.on('accountsChanged', accountListener)
          break

        default:
          ethereum?.on('chainChanged', () => location.reload())
          ethereum?.on('accountsChanged', accountListener)
          break
      }

      setStarted((prev) => {
        prev[1] = 201
        return prev
      })
    }
  }, [started])

  useEffect(() => {
    if (started[0]) clearInterval(started[0])
    if (account) {
      const intervalId = setInterval(() => onFetchBalance(account), 2e4)
      onFetchBalance(account)
      setStarted((prev) => {
        prev[0] = intervalId
        return prev
      })
    }
  }, [account, started])

  // __RETURN
  return null
}
