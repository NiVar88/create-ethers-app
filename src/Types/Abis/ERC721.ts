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

export type ContractContext = Web3ContractContext<ERC721, ERC721MethodNames, ERC721EventsContext, ERC721Events>
export type ERC721Events = 'Mint' | 'Transfer' | 'Approval'
export interface ERC721EventsContext {
  Mint(
    parameters: {
      filter?: { _to?: string | string[]; _tokenId?: string | string[] }
      fromBlock?: number
      toBlock?: 'latest' | number
      topics?: string[]
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse
  Transfer(
    parameters: {
      filter?: { _from?: string | string[]; _to?: string | string[] }
      fromBlock?: number
      toBlock?: 'latest' | number
      topics?: string[]
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse
  Approval(
    parameters: {
      filter?: { _owner?: string | string[]; _approved?: string | string[] }
      fromBlock?: number
      toBlock?: 'latest' | number
      topics?: string[]
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse
}
export type ERC721MethodNames =
  | 'name'
  | 'getApproved'
  | 'approve'
  | 'implementsERC721'
  | 'totalSupply'
  | 'transferFrom'
  | 'tokenOfOwnerByIndex'
  | 'ownerOf'
  | 'tokenMetadata'
  | 'balanceOf'
  | 'mint'
  | 'symbol'
  | 'transfer'
  | 'numTokensTotal'
  | 'getOwnerTokens'
  | 'tokenURI'
export interface MintEventEmittedResponse {
  _to: string
  _tokenId: string
}
export interface TransferEventEmittedResponse {
  _from: string
  _to: string
  _tokenId: string
}
export interface ApprovalEventEmittedResponse {
  _owner: string
  _approved: string
  _tokenId: string
}
export interface ERC721 {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  getApproved(_tokenId: string): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _to Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  approve(_to: string, _tokenId: string): MethodReturnContext
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  implementsERC721(): MethodConstantReturnContext<boolean>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalSupply(): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  transferFrom(_from: string, _to: string, _tokenId: string): MethodReturnContext
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   * @param _index Type: uint256, Indexed: false
   */
  tokenOfOwnerByIndex(_owner: string, _index: string): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  ownerOf(_tokenId: string): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  tokenMetadata(_tokenId: string): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  balanceOf(_owner: string): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _owner Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   * @param _approvedAddress Type: address, Indexed: false
   * @param _metadata Type: string, Indexed: false
   */
  mint(_owner: string, _tokenId: string, _approvedAddress: string, _metadata: string): MethodReturnContext
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _to Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  transfer(_to: string, _tokenId: string): MethodReturnContext
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  numTokensTotal(): MethodConstantReturnContext<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  getOwnerTokens(_owner: string): MethodConstantReturnContext<string[]>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  tokenURI(tokenId: string): MethodConstantReturnContext<string>
}
