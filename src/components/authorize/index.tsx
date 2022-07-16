import { useCallback, useEffect } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { configs, Connectors, NoticeName } from '@/constants'
import { useWeb3ReactCore, useWalletConnection, useTheme } from '@/hooks'
import { AuthService } from '@/services'
import { isEqual, isNotEqual, notice } from '@/utils'
import { cookie, storage } from '@/utils/storage'

export default function AuthorizeContainer() {
  // __EFFECTS
  useTheme()

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
  const signSignature = useCallback(
    async (address: string) => {
      if (!library) return void 0

      const signer = library.getSigner(address)
      const nonce = await AuthService.getNonce(address)
      const signature = await signer.signMessage(`Sign-in with once-time nonce: ${nonce}`)
      if (signature) {
        notice.close('connecting')
        AuthService.signin(address, signature)
      } else {
        notice.warn({
          title: 'Failed',
          content: 'User rejected the request.'
        })
      }
    },
    [library]
  )

  // __EFFECTS
  useEffect(() => {
    const refreshToken = cookie.get(configs.APP_AUTH_REFRESH)

    if (account) {
      const currentAccount = storage.get(configs.APP_USER_ADDRESS)

      if (isEqual(account, currentAccount) && refreshToken) {
        AuthService.getProfile(account)
      } else {
        signSignature(account)
      }
    } else {
      const connector = storage.get<Connectors | null>(configs.APP_USER_CONNECTOR)
      if (connector && refreshToken) connect(connector, true)
      else AuthService.signout()
    }
  }, [account, connect, signSignature])

  // __RETURN
  return null
}

/**
 * Listener on switch chain-id.
 */
export function NetworkListener() {
  // __STATE <React.Hooks>
  const { account, library } = useWeb3ReactCore<Web3Provider>()

  // __FUNCTIONS
  const switchNetwork = useCallback(async () => {
    if (!library) return void 0

    const { chainId } = await library.getNetwork()
    if (isNotEqual(chainId, configs.DEFAULT_CHAIN_ID)) {
      notice.warn({
        vid: 'network-alert',
        title: "You're connected to the wrong network.",
        content: NoticeName.WARN_NETWORK,
        duration: 0
      })
    } else {
      notice.close('network-alert')
    }
  }, [library])

  // __EFFECTS
  useEffect(() => {
    if (account) {
      switchNetwork()
    }
  }, [account, switchNetwork])

  // __RETURN
  return null
}
