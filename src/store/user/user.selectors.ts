import { GAS_PRICE_GWEI } from '@/constants'
import { isMainnet } from '@/libs/configs'
import { StoreTypes } from '@/store'

export function getAll({ user: { address, profile } }: StoreTypes) {
  return {
    address,
    profile,
    isAuth: Boolean(address && profile)
  }
}

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
  return isMainnet ? gasPrice : GAS_PRICE_GWEI.testnet
}
