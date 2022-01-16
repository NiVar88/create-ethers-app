/// <reference types="react-scripts" />

declare type EventNames = 'connect' | 'message' | 'error' | 'close' | 'disconnect' | 'accountsChanged' | 'chainChanged'

declare interface Window {
  readonly web3?: any
  readonly ethereum?: {
    chainId: string
    enable: () => void
    isMetaMask: boolean
    networkVersion: string
    selectedAddress: string | null
    on(name: EventNames, callback: (e: any) => void): void
    request: (...args: any[]) => Promise<void>
    removeListener(e: any, t: any)
  }
  readonly BinanceChain?: {
    bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>
  }
}

declare interface Array<T = any> {
  findOne: (prop: keyof T, value: string | number | boolean) => T
  findAll: (prop: keyof T, value: string | number | boolean) => T[]
  remove: (prop: keyof T, value: string | number | boolean) => T[]
  groupBy: (prop: keyof T) => T
  orderBy: (prop: keyof T, type?: string) => T[]
}

declare module 'web3-token'
declare module '*.json'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.webp'
