import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'

export type { Dialog, DialogContent, DialogOptions, DialogResults } from './dialog'
export type { Modal, ModalContent, ModalOptions } from './modal'
export type { Notice, NoticeContent, NoticeOptions, NoticeTypes } from './notice'
export type { Token } from './token'
export type { User } from './user'
export type { Wallet } from './wallet'
export type { ISignatureParams, IRespNonce, IRespToken } from './xhr'

export type Library = Signer | Provider

export interface IMedia {
  url: string
  isImage?: boolean
  isVideo?: boolean
  isAudio?: boolean
}

export interface CurrencyBalance {
  symbol: string
  value: string
}

export interface AvatarPayload {
  dataURL: string
  name: string
  type: string
}
