import { Contract, ContractInterface } from '@ethersproject/contracts'
import { isAddress } from '@ethersproject/address'
import type { Library } from '@/types'

import ERC20_ABI from './abis/ERC20.json'
import ERC721_ABI from './abis/ERC721.json'
import MULTICALL_ABI from './abis/Multicall.json'
import PANCAKE_ROUTER_ABI from './abis/PancakeRouter.json'
import REFERENCE_BULK_ABI from './abis/ReferenceBulk.json'

export { ERC20_ABI, ERC721_ABI, MULTICALL_ABI, PANCAKE_ROUTER_ABI, REFERENCE_BULK_ABI }

/**
 * Create contract factory.
 *
 * @param {String} contractAddress
 * @param {AbiItem} contractAbi
 */
export class ContractFactory {
  constructor(contractAddress: string, contractAbi: ContractInterface, signerOrProvider?: Library) {
    if (!isAddress(contractAddress)) {
      throw new Error(`Invalid 'ContractAddress' parameter '${contractAddress}'.`)
    }

    return new Contract(contractAddress, contractAbi, signerOrProvider)
  }
}
