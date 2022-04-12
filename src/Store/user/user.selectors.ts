import { configs, GAS_PRICE_GWEI } from '@/Constants'
import { StoreTypes } from '@/Store'

export function getAuthenticated({ user: { address, profile } }: StoreTypes) {
  return Boolean(address && profile)
}

export function getAddress({ user: { address } }: StoreTypes) {
  return address
}

export function getProfile({ user: { profile } }: StoreTypes) {
  return profile
}

export function getGasPrice({ user: { gasPrice } }: StoreTypes) {
  return configs.isMainnet ? gasPrice : GAS_PRICE_GWEI.testnet
}

export function getCurrencyBalance({ user: { currencyBalances } }: StoreTypes) {
  return currencyBalances
}
