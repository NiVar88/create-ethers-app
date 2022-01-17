import { Fraction } from '@/utils'

import { ChainId, SupportedChainId } from './chains'
import { Connectors } from './connectors'
import { Token } from './token'
import { User } from './user'
import { Wallet } from './wallet'

export * from './status'
export type { Dialog, DialogOptions, DialogResults } from '@/utils/dialog'
export type { Notice, NoticeOptions } from '@/utils/notice'
export type { Modal, ModalOptions } from '@/utils/modal'

export type { Token, User, Wallet }
export { ChainId, SupportedChainId, Connectors }

export type Theme = 'default' | 'light' | 'dark'

export interface NaticeCoin {
  chainId: number
  name: string
  symbol: string
  decimals: number
  wrappedSymbol: string
  allowance: number
}

export interface CurrencyBalance {
  symbol: string
  value: string
}

export interface CurrencyInputCallback {
  currency: Token
  value: Fraction
}
