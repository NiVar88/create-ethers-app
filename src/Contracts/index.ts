import { Contract, ContractInterface } from '@ethersproject/contracts'
import { isAddress } from '@ethersproject/address'
import type { Library } from '@/Types'

import ERC20_ABI from './Abis/ERC20.json'
import ERC721_ABI from './Abis/ERC721.json'
import MASTERCHEF_ABI from './Abis/MasterChef.json'
import MULTICALL_ABI from './Abis/Multicall.json'
import PANCAKE_ROUTER_ABI from './Abis/PancakeRouter.json'

export { ERC20_ABI, ERC721_ABI, MASTERCHEF_ABI, MULTICALL_ABI, PANCAKE_ROUTER_ABI }

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
