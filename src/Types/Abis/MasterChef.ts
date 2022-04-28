import { ContractTransaction, ContractInterface, BytesLike as Arrayish, BigNumber, BigNumberish } from 'ethers'
import { EthersContractContextV5 } from 'ethereum-abi-types-generator'

export type ContractContext = EthersContractContextV5<
  MasterChef,
  MasterChefMethodNames,
  MasterChefEventsContext,
  MasterChefEvents
>

export declare type EventFilter = {
  address?: string
  topics?: Array<string>
  fromBlock?: string | number
  toBlock?: string | number
}

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>
  /**
   * The nonce to use in the transaction
   */
  nonce?: number
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number
}
export type MasterChefEvents = undefined
export interface MasterChefEventsContext {}
export type MasterChefMethodNames = 'getMultiplier' | 'poolInfo' | 'totalAllocPoint' | 'peachPerBlock' | 'MOOSEPerBlock'
export interface PoolInfoResponse {
  lpToken: string
  0: string
  allocPoint: BigNumber
  1: BigNumber
  lastRewardBlock: BigNumber
  2: BigNumber
  accPeachPerShare: BigNumber
  3: BigNumber
  withdrawFee: number
  4: number
  length: 5
}
export interface MasterChef {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _from Type: uint256, Indexed: false
   * @param _to Type: uint256, Indexed: false
   */
  getMultiplier(_from: BigNumberish, _to: BigNumberish, overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  poolInfo(parameter0: BigNumberish, overrides?: ContractCallOverrides): Promise<PoolInfoResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalAllocPoint(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  peachPerBlock(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  MOOSEPerBlock(overrides?: ContractCallOverrides): Promise<BigNumber>
}
