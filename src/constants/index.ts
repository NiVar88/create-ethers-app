export * as configs from './configs'
export { Addresses } from './addresses'
export { Connectors, ChainId, SupportedChainId, GAS_PRICE, GAS_PRICE_GWEI } from './ethers'
export { Fruit } from './fruit'
export { RPCS } from './rpcs'
export { Tokens, tokens } from './tokens'
export { Wallets } from './wallets'

export enum Theme {
  DEFAULT = 'default',
  LIGHT = 'light',
  DARK = 'dark'
}

export enum DialogName {
  SYSTEM_ALERT = '@DIALOG:SYSTEM_ALERT'
}

export enum ModalName {
  CONNECT_WALLET = '@MODAL:CONNECT_WALLET'
}

export enum NoticeName {
  WARN_NETWORK = '@NOTICE:WARN_NETWORK'
}

export enum ApproveStatus {
  PENDING,
  APPROVED,
  NOT_APPROVED
}
