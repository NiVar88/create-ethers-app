import Web3, { AbiItem, isAddress } from '@/libs/web3'
import { getRpcUrl } from '@/constants'
import {
  ERC20Interface,
  ERC721Interface,
  MasterChefInterface,
  MulticallInterface,
  PancakeRouterInterface
} from '@/types/abis'

import ERC20_ABI from './abis/ERC20.json'
import ERC721_ABI from './abis/ERC721.json'
import MASTERCHEF_ABI from './abis/MasterChef.json'
import MULTICALL_ABI from './abis/Multicall.json'
import PANCAKE_ROUTER_ABI from './abis/PancakeRouter.json'

export { ERC20_ABI, ERC721_ABI, MASTERCHEF_ABI, MULTICALL_ABI, PANCAKE_ROUTER_ABI }

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
 * Create contract factory.
 *
 * @param {string} contractAddress
 * @param {AbiItem} contractAbi
 */
export function ContractFactory(contractAddress: string, contractAbi: AbiItem[]) {
  if (!isAddress(contractAddress)) {
    throw new Error(`Invalid 'ContractAddress' parameter '${contractAddress}'.`)
  }

  const { Contract } = GivenProvider()
  return new Contract(contractAbi, contractAddress)
}

/**
 * Create ERC20 contract.
 *
 * @param {string} contractAddress
 */
export class ERC20Contract {
  static build(contractAddress: string) {
    return ContractFactory(contractAddress, ERC20_ABI as AbiItem[]) as unknown as ERC20Interface
  }
}

/**
 * Create ERC721 contract.
 *
 * @param {string} contractAddress
 */
export class ERC721Contract {
  static build(contractAddress: string) {
    return ContractFactory(contractAddress, ERC721_ABI as AbiItem[]) as unknown as ERC721Interface
  }
}

/**
 * Create MasterChef contract.
 *
 * @param {string} contractAddress
 */
export class MasterChefContract {
  static build(contractAddress: string) {
    return ContractFactory(contractAddress, MASTERCHEF_ABI as AbiItem[]) as unknown as MasterChefInterface
  }
}

/**
 * Create Multicall contract.
 *
 * @param {string} contractAddress
 * @param {boolean} withSignerIfPossible
 */
export class MulticallContract {
  static build(contractAddress: string) {
    return ContractFactory(contractAddress, MULTICALL_ABI as AbiItem[]) as unknown as MulticallInterface
  }
}

/**
 * Create Pancake router contract.
 *
 * @param {string} contractAddress
 * @param {boolean} withSignerIfPossible
 */
export class RouterContract {
  static build(contractAddress: string) {
    return ContractFactory(contractAddress, PANCAKE_ROUTER_ABI as AbiItem[]) as unknown as PancakeRouterInterface
  }
}
