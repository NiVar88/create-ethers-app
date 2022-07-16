import { useMemo } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers'
import { ContractInterface } from '@ethersproject/contracts'
import { ContractFactory } from '@/contracts'
import type {
  ERC20Interface,
  ERC721Interface,
  MulticallInterface,
  PancakeRouterInterface,
  ReferenceBulkInterface
} from '@/types/abis'

import { ERC20_ABI, ERC721_ABI, MULTICALL_ABI, PANCAKE_ROUTER_ABI, REFERENCE_BULK_ABI } from '@/contracts'
import { getRpcUrl } from '@/utils/ethers'

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
    let signerOrProvider = account ? library?.getSigner(account).connectUnchecked() : library
    if (!signerOrProvider) {
      signerOrProvider = new JsonRpcProvider(getRpcUrl()) as any
    }

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

/**
 * Create Pancake router contract.
 *
 * @param {string} contractAddress
 */
export function useReferenceBulkContract(contractAddress: string) {
  // __RETURN
  return useContractFactory(contractAddress, REFERENCE_BULK_ABI) as unknown as ReferenceBulkInterface
}
