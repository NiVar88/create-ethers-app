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
  MasterChef,
  MasterChefMethodNames,
  MasterChefEventsContext,
  MasterChefEvents
>
export type MasterChefEvents = undefined
export interface MasterChefEventsContext {}
export type MasterChefMethodNames = 'getMultiplier' | 'poolInfo' | 'totalAllocPoint' | 'peachPerBlock' | 'MOOSEPerBlock'
export interface PoolInfoResponse {
  lpToken: string
  allocPoint: string
  lastRewardBlock: string
  accPeachPerShare: string
  withdrawFee: string
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
  getMultiplier(_from: string, _to: string): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  poolInfo(parameter0: string): MethodConstantReturnContext<PoolInfoResponse>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalAllocPoint(): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  peachPerBlock(): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  MOOSEPerBlock(): MethodConstantReturnContext<string>
}
