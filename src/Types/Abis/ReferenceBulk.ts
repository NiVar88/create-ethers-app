import { ContractTransaction, ContractInterface, BytesLike as Arrayish, BigNumber, BigNumberish } from 'ethers'
import { EthersContractContextV5 } from 'ethereum-abi-types-generator'

export type ContractContext = EthersContractContextV5<
  ReferenceBulk,
  ReferenceBulkMethodNames,
  ReferenceBulkEventsContext,
  ReferenceBulkEvents
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
export type ReferenceBulkEvents = 'OwnershipTransferred'
export interface ReferenceBulkEventsContext {
  OwnershipTransferred(...parameters: any): EventFilter
}
export type ReferenceBulkMethodNames =
  | 'new'
  | 'getReferenceData'
  | 'getReferenceDataBulk'
  | 'owner'
  | 'ref'
  | 'renounceOwnership'
  | 'setRef'
  | 'transferOwnership'
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string
  newOwner: string
}
export interface ReferencedataResponse {
  rate: BigNumber
  0: BigNumber
  lastUpdatedBase: BigNumber
  1: BigNumber
  lastUpdatedQuote: BigNumber
  2: BigNumber
}
export interface ReferenceBulk {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param _ref Type: address, Indexed: false
   */
  'new'(_ref: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _base Type: string, Indexed: false
   * @param _quote Type: string, Indexed: false
   */
  getReferenceData(_base: string, _quote: string, overrides?: ContractCallOverrides): Promise<ReferencedataResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _bases Type: string[], Indexed: false
   * @param _quotes Type: string[], Indexed: false
   */
  getReferenceDataBulk(
    _bases: string[],
    _quotes: string[],
    overrides?: ContractCallOverrides
  ): Promise<ReferencedataResponse[]>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  ref(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  renounceOwnership(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _ref Type: address, Indexed: false
   */
  setRef(_ref: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  transferOwnership(newOwner: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>
}
