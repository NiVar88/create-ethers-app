import BN from 'bn.js'
import BigNumber from 'bignumber.js'
import {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext
} from 'ethereum-abi-types-generator'

export interface CallOptions {
  from?: string
  gasPrice?: string
  gas?: number
}

export interface SendOptions {
  from: string
  value?: number | string | BN | BigNumber
  gasPrice?: string
  gas?: number
}

export interface EstimateGasOptions {
  from?: string
  value?: number | string | BN | BigNumber
  gas?: number
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>
  send(options: SendOptions, callback: (error: Error, result: any) => void): PromiEvent<TransactionReceipt>
  estimateGas(options: EstimateGasOptions): Promise<number>
  estimateGas(options: EstimateGasOptions, callback: (error: Error, result: any) => void): Promise<number>
  encodeABI(): string
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>
  call(options: CallOptions): Promise<TCallReturn>
  call(options: CallOptions, callback: (error: Error, result: TCallReturn) => void): Promise<TCallReturn>
  encodeABI(): string
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export type ContractContext = Web3ContractContext<
  Multicall,
  MulticallMethodNames,
  MulticallEventsContext,
  MulticallEvents
>
export type MulticallEvents = undefined
export interface MulticallEventsContext {}
export type MulticallMethodNames =
  | 'aggregate'
  | 'blockAndAggregate'
  | 'getBlockHash'
  | 'getBlockNumber'
  | 'getCurrentBlockCoinbase'
  | 'getCurrentBlockDifficulty'
  | 'getCurrentBlockGasLimit'
  | 'getCurrentBlockTimestamp'
  | 'getEthBalance'
  | 'getLastBlockHash'
  | 'tryAggregate'
  | 'tryBlockAndAggregate'
export interface AggregateRequest {
  target: string
  callData: string | number[]
}
export interface AggregateResponse {
  blockNumber: string
  returnData: string[]
}
export interface BlockAndAggregateRequest {
  target: string
  callData: string | number[]
}
export interface TryAggregateRequest {
  target: string
  callData: string | number[]
}
export interface ReturnDataResponse {
  success: boolean
  returnData: string
}
export interface TryBlockAndAggregateRequest {
  target: string
  callData: string | number[]
}
export interface Multicall {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param calls Type: tuple[], Indexed: false
   */
  aggregate(calls: AggregateRequest[]): MethodConstantReturnContext<AggregateResponse>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param calls Type: tuple[], Indexed: false
   */
  blockAndAggregate(calls: BlockAndAggregateRequest[]): MethodReturnContext
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param blockNumber Type: uint256, Indexed: false
   */
  getBlockHash(blockNumber: string): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getBlockNumber(): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCurrentBlockCoinbase(): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCurrentBlockDifficulty(): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCurrentBlockGasLimit(): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCurrentBlockTimestamp(): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param addr Type: address, Indexed: false
   */
  getEthBalance(addr: string): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getLastBlockHash(): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param requireSuccess Type: bool, Indexed: false
   * @param calls Type: tuple[], Indexed: false
   */
  tryAggregate(requireSuccess: boolean, calls: TryAggregateRequest[]): MethodConstantReturnContext<ReturnDataResponse[]>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param requireSuccess Type: bool, Indexed: false
   * @param calls Type: tuple[], Indexed: false
   */
  tryBlockAndAggregate(requireSuccess: boolean, calls: TryBlockAndAggregateRequest[]): MethodReturnContext
}
