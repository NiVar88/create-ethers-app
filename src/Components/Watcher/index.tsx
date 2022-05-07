import { useCallback, useEffect, useState } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { configs } from '@/Constants'
import { useWeb3ReactCore, useFetchCurrencyBalance, useWalletConnection, useTheme } from '@/Hooks'
import { AuthService } from '@/Services/auth.service'
import { getCookie, isEqual, isNotEqual, notice } from '@/Utils'
import { Connectors } from '@/Types'
import { NetworkAlertComponent } from './network'

export function WatcherContainer() {
  // __STATE <React.Hooks>
  // const [onFetchBalance] = useFetchCurrencyBalance()

  useTheme()

  // __EFFECTS
  // useEffect(() => {
  //   const connector = getCurrentConnector()
  //   if (connector && !started[1]) {
  //     const { BinanceChain: binance, ethereum } = window
  //     const accountListener = (accounts: string[]) => {
  //       if (accounts.length) {
  //         // AuthService.signin(accounts[0])
  //       }
  //     }

  //     switch (connector) {
  //       case Connectors.BSC:
  //         binance?.on('chainChanged', () => location.reload())
  //         binance?.on('accountsChanged', accountListener)
  //         break

  //       default:
  //         ethereum?.on('chainChanged', () => location.reload())
  //         ethereum?.on('accountsChanged', accountListener)
  //         break
  //     }

  //     setStarted((prev) => {
  //       prev[1] = 201
  //       return prev
  //     })
  //   }
  // }, [started])

  // useEffect(() => {
  //   if (started[0]) clearInterval(started[0])
  //   if (account && 0) {
  //     const intervalId = setInterval(() => onFetchBalance(account), 2e4)
  //     onFetchBalance(account)
  //     setStarted((prev) => {
  //       prev[0] = intervalId
  //       return prev
  //     })
  //   }
  // }, [account, started])

  // __RETURN
  return (
    <>
      <AuthListener />
      <NetworkListener />
    </>
  )
}

/**
 * Listener on wallet connection for sign-signature.
 */
export function AuthListener() {
  // __STATE <React.Hooks>
  const { account, library } = useWeb3ReactCore<Web3Provider>()
  const { connect } = useWalletConnection()

  // __FUNCTIONS
  const handleSignSignature = useCallback(
    async (address: string) => {
      if (!library) return void 0

      const signer = library.getSigner(address)
      const nonce = await AuthService.getNonce(address)
      const signature = await signer.signMessage(`Sign-In: ${nonce}`)
      if (signature) AuthService.signin(address, signature)
    },
    [library]
  )

  // __EFFECTS
  useEffect(() => {
    if (account) {
      if (getCookie(configs.APP_AUTH_REFRESH)) {
        AuthService.getProfile(account)
      } else {
        handleSignSignature(account)
      }
    } else {
      const connector: Connectors = getCookie(configs.APP_USER_CONNECTOR)
      if (connector) connect(connector)
      else AuthService.signout()
    }
  }, [account, connect, handleSignSignature])

  // __RETURN
  return null
}

/**
 * Listener on switch chain-id.
 */
export function NetworkListener() {
  // __STATE <React.Hooks>
  const { account, library } = useWeb3ReactCore<Web3Provider>()
  const [vid, setVid] = useState<string>('')

  // __FUNCTIONS
  const handleSwitchNetwork = useCallback(async () => {
    if (!library) return void 0

    const { chainId } = await library.getNetwork()
    const noticeId = 'd3JvbmdfbmV0'
    if (isNotEqual(chainId, configs.DEFAULT_CHAIN_ID)) {
      notice.warn({
        vid: noticeId,
        title: "You're connected to the wrong network.",
        content: <NetworkAlertComponent library={library} />,
        duration: 0
      })
    } else {
      notice.close(noticeId)
    }
  }, [library, vid])

  // __EFFECTS
  useEffect(() => {
    if (account) {
      handleSwitchNetwork()
    }
  }, [account, handleSwitchNetwork])

  // __RETURN
  return null
}
