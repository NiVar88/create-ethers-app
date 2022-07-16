import { ContractTransaction, ContractInterface, BytesLike as Arrayish, BigNumber, BigNumberish } from 'ethers'
import { EthersContractContextV5 } from 'ethereum-abi-types-generator'

export type ContractContext = EthersContractContextV5<ERC721, ERC721MethodNames, ERC721EventsContext, ERC721Events>

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
export type ERC721Events = 'Mint' | 'Transfer' | 'Approval'
export interface ERC721EventsContext {
  Mint(...parameters: any): EventFilter
  Transfer(...parameters: any): EventFilter
  Approval(...parameters: any): EventFilter
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
  _tokenId: BigNumberish
}
export interface TransferEventEmittedResponse {
  _from: string
  _to: string
  _tokenId: BigNumberish
}
export interface ApprovalEventEmittedResponse {
  _owner: string
  _approved: string
  _tokenId: BigNumberish
}
export interface ERC721 {
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  getApproved(_tokenId: BigNumberish, overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _to Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  approve(_to: string, _tokenId: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  implementsERC721(overrides?: ContractCallOverrides): Promise<boolean>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalSupply(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _from Type: address, Indexed: false
   * @param _to Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  transferFrom(
    _from: string,
    _to: string,
    _tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   * @param _index Type: uint256, Indexed: false
   */
  tokenOfOwnerByIndex(_owner: string, _index: BigNumberish, overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  ownerOf(_tokenId: BigNumberish, overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _tokenId Type: uint256, Indexed: false
   */
  tokenMetadata(_tokenId: BigNumberish, overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  balanceOf(_owner: string, overrides?: ContractCallOverrides): Promise<BigNumber>
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
  mint(
    _owner: string,
    _tokenId: BigNumberish,
    _approvedAddress: string,
    _metadata: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(overrides?: ContractCallOverrides): Promise<string>
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _to Type: address, Indexed: false
   * @param _tokenId Type: uint256, Indexed: false
   */
  transfer(_to: string, _tokenId: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  numTokensTotal(overrides?: ContractCallOverrides): Promise<BigNumber>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  getOwnerTokens(_owner: string, overrides?: ContractCallOverrides): Promise<BigNumber[]>
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  tokenURI(tokenId: BigNumberish, overrides?: ContractCallOverrides): Promise<string>
}
