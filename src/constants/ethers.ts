import { parseUnits } from '@ethersproject/units'

export enum Connectors {
  Injected = 'injected',
  BSC = 'bsc',
  CoinbaseWallet = 'coinbasewallet',
  WalletConnect = 'walletconnect'
}

export enum ChainId {
  BSC = 56,
  BSC_TESTNET = 97
}

export enum SupportedChainId {
  ARBITRUM = 42161,
  ARBITRUM_TESTNET = 79377087078960,
  ARKON = 1677,
  ARKON_TESTNET = 1678,
  AURORA = 1313161554,
  AURORA_TESTNET = 1313161555,
  AVAX = 43114,
  AVAX_TESTNET = 43113,
  BSC = 56,
  BSC_TESTNET = 97,
  FANTOM = 250,
  FANTOM_TESTNET = 4002,
  HARMONY = 1666600000,
  HARMONY_TESTNET = 1666700000,
  HECO = 128,
  HECO_TESTNET = 256,
  POLYGON = 137,
  POLYGON_TESTNET = 80001
}

export enum GAS_PRICE {
  default = '5',
  fast = '6',
  instant = '7',
  testnet = '10'
}

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE.testnet, 'gwei').toString()
}
