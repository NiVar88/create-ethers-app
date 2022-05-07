import { utils } from 'ethers'
import { Web3Provider, StaticJsonRpcProvider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { configs } from '@/Constants'
import { RPCS } from '@/Constants/rpcs'
import { Connectors, ChainId } from '@/Types'
import { getCookie } from './cookies'

/**
 * Given library for `useWeb3ReactCore`
 *
 * @param {Any} provider
 * @returns Web3Provider
 */
export function givenLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

/**
 * Get current wallet connector.
 */
export function getCurrentConnector(): Connectors | Void {
  const connector: Connectors = getCookie(configs.APP_USER_CONNECTOR)

  if (connector) return connector

  return void 0
}

/**
 * GET Random rpc url.
 *
 * @param {ChainId} chainId
 */
export function getRpcUrl(chainId: ChainId = configs.DEFAULT_CHAIN_ID) {
  const index = Math.floor(Math.random() * RPCS[chainId].length)
  return RPCS[chainId][index] || ''
}

/**
 * SET Address by current config chain-id,
 *
 * @param {Record} addresses
 */
export function setAddress(addresses: Record<ChainId, string | null>) {
  return addresses[configs.DEFAULT_CHAIN_ID] || ''
}

/**
 * Convert address to short string.
 *
 * @param {string} address
 */
export function shortAddress(address?: string | null): string {
  if (address) {
    return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`
  } else {
    return '...'
  }
}

export const injected = new InjectedConnector({})

export const walletbsc = new BscConnector({})

export const walletlink = new WalletLinkConnector({
  appName: configs.APP_NAME,
  url: getRpcUrl()
})

export const walletconnect = new WalletConnectConnector({
  rpc: getRpcUrl(),
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true
})

export const connectors: Record<Connectors, AbstractConnector> = {
  [Connectors.Injected]: injected,
  [Connectors.BSC]: walletbsc,
  [Connectors.CoinbaseWallet]: walletlink,
  [Connectors.WalletConnect]: walletconnect
}

export { utils }
export const { Interface } = utils
export const simpleRpcProvider = new StaticJsonRpcProvider(getRpcUrl())
