import { Dialog } from '@/Utils/dialog'
import { Modal } from '@/Utils/modal'
import { Notice } from '@/Utils/notice'

export * from './status'
export { ChainId, SupportedChainId } from './chains'
export { Connectors } from './connectors'

export type { Token } from './token'
export type { User, IUser } from './user'
export type { Wallet } from './wallet'
export type { Dialog, Modal, Notice }

export type Theme = 'default' | 'light' | 'dark'

export enum IDialog {
  DEMO = '@DIALOG:DEMO'
}

export enum IModal {
  CONNECT_WALLET = '@MODAL:CONNECT_WALLET'
}

export interface CurrencyBalance {
  symbol: string
  value: string
}
