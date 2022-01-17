import Web3 from 'web3'
import { utils } from 'ethers'
import { getRpcUrl } from '@/constants'

export { default } from 'web3'
export * from 'web3-core'
export * from 'web3-eth'
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
