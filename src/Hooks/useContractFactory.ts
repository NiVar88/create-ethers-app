import { useMemo } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { ContractInterface } from '@ethersproject/contracts'
import { ContractFactory } from '@/Contracts'
import type {
  ERC20Interface,
  ERC721Interface,
  MasterChefInterface,
  MulticallInterface,
  PancakeRouterInterface
} from '@/Types/Abis'

import { ERC20_ABI, ERC721_ABI, MASTERCHEF_ABI, MULTICALL_ABI, PANCAKE_ROUTER_ABI } from '@/Contracts'

/**
 * Create contract.
 *
 * @param {String} contractAddress
 * @param {ContractInterface} contractAbi
 * @param {Boolean} withSignerIfPossible
 */
export function useContractFactory(
  contractAddress: string,
  contractAbi: ContractInterface,
  withSignerIfPossible: boolean = true
) {
  // __STATE <React.Hooks>
  const { account, library } = useWeb3ReactCore<Web3Provider>()

  // __RETURN
  return useMemo(() => {
    if (!account || !library) return void 0

    const signerOrProvider = account ? library.getSigner(account).connectUnchecked() : library

    return new ContractFactory(contractAddress, contractAbi, signerOrProvider)
  }, [account, library, contractAddress, contractAbi, withSignerIfPossible])
}

/**
 * Create ERC20 contract.
 *
 * @param {String} contractAddress
 */
export function useERC20Contract(contractAddress: string) {
  // __RETURN
  return useContractFactory(contractAddress, ERC20_ABI) as unknown as ERC20Interface
}

/**
 * Create ERC721 contract.
 *
 * @param {string} contractAddress
 */
export function useERC721Contract(contractAddress: string) {
  // __RETURN
  return useContractFactory(contractAddress, ERC721_ABI) as unknown as ERC721Interface
}

/**
 * Create MasterChef contract.
 *
 * @param {string} contractAddress
 */
export function useMasterChefContract(contractAddress: string) {
  // __RETURN
  return useContractFactory(contractAddress, MASTERCHEF_ABI) as unknown as MasterChefInterface
}

/**
 * Create Multicall contract.
 *
 * @param {string} contractAddress
 */
export function useMulticallContract(contractAddress: string) {
  // __RETURN
  return useContractFactory(contractAddress, MULTICALL_ABI) as unknown as MulticallInterface
}

/**
 * Create Pancake router contract.
 *
 * @param {string} contractAddress
 */
export function useRouterContract(contractAddress: string) {
  // __RETURN
  return useContractFactory(contractAddress, PANCAKE_ROUTER_ABI) as unknown as PancakeRouterInterface
}
