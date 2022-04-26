import { utils } from 'ethers'
import { Web3Provider, StaticJsonRpcProvider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { configs, RPCS } from '@/Constants'
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
 * GET Random rpc url.
 *
 * @param {ChainId} chainId
 */
export function getRpcUrl(chainId: ChainId = configs.DEFAULT_CHAIN_ID) {
  const index = Math.floor(Math.random() * RPCS[chainId].length)
  return RPCS[chainId][index]
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

export const connectorsBy: Record<Connectors, AbstractConnector> = {
  [Connectors.Injected]: new InjectedConnector({ supportedChainIds: [ChainId.BSC, ChainId.BSC_TESTNET] }),
  [Connectors.BSC]: new BscConnector({ supportedChainIds: [ChainId.BSC, ChainId.BSC_TESTNET] }),
  [Connectors.WalletConnect]: new WalletConnectConnector({
    rpc: {
      [ChainId.BSC]: RPCS[ChainId.BSC][0],
      [ChainId.BSC_TESTNET]: RPCS[ChainId.BSC_TESTNET][0]
    },
    qrcode: true
  })
}

export { utils }
export const { Interface } = utils
export const simpleRpcProvider = new StaticJsonRpcProvider(getRpcUrl())
