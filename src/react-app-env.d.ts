/// <reference types="react-scripts" />

declare type EventNames = 'connect' | 'disconnect' | 'accountsChanged' | 'chainChanged'

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
    chainId: string
    on(name: EventNames, callback: (e: any) => void): void
    request: (...args: any[]) => Promise<void>
    bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>
    switchNetwork: (networkId: 'bbc-mainnet' | 'bsc-mainnet' | 'bbc-testnet' | 'bsc-testnet') => Promise<any>
  }
}

declare interface Array<T = any> {
  findOne: (prop: keyof T, value: string | number | boolean) => T
  findAll: (prop: keyof T, value: string | number | boolean) => T[]
  remove: (prop: keyof T, value: string | number | boolean) => T[]
  groupBy: (prop: keyof T) => T
  orderBy: (prop: keyof T, type?: string) => T[]
}

declare module '*.json'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.webp'
