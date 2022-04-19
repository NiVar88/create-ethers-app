import Web3 from 'web3'
import { utils } from 'ethers'
import { configs, RPCS } from '@/Constants'
import { Connectors, ChainId } from '@/Types'
import { getCookie } from './cookies'

export { default } from 'web3'
export * from 'web3-core'
export * from 'web3-eth-abi'
export * from 'web3-eth-contract'
export * from 'web3-utils'

export { utils }
export const { Interface } = utils

/**
 * Create web3 provider instance.
 */
export function GivenProvider() {
  if (Web3.givenProvider) {
    return new Web3(Web3.givenProvider).eth
  } else {
    const rpc = getRpcUrl()
    return new Web3(rpc).eth
  }
}

/**
 * Get current wallet connector.
 */
export function GivenConnector() {
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
 * GET Balance of BNB.
 *
 * @param {String} account
 */
export async function getBNBBalance(account: string) {
  const provider = GivenProvider()
  return await provider.getBalance(account)
}
