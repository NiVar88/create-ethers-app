import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { Notice } from '@/Utils/notice'

export * from './status'
export { ChainId, SupportedChainId } from './chains'
export { Connectors } from './connectors'
export { IDialog } from './dialog'
export { IModal } from './modal'

export type { Dialog, DialogChildren, DialogOptions, DialogResults } from './dialog'
export type { Modal, ModalChildren, ModalOptions } from './modal'
export type { Token } from './token'
export type { User, IUser } from './user'
export type { Wallet } from './wallet'
export type { Notice }

export type Library = Signer | Provider

export enum Theme {
  DEFAULT = 'default',
  LIGHT = 'light',
  DARK = 'dark'
}

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
