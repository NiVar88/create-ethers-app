import Web3 from 'web3'
import { utils } from 'ethers'
import { configs, RPCS } from '@/Constants'
import { getCookie } from '@/Utils'
import { Connectors, ChainId } from '@/Types'

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
 * GET Random rpc url.
 *
 * @param {ChainId} chainId
 */
export function getRpcUrl(chainId: ChainId = configs.DEFAULT_CHAIN_ID) {
  const index = Math.floor(Math.random() * RPCS[chainId].length)
  return RPCS[chainId][index]
}
