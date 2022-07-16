import { Connectors } from './ethers'
import type { Wallet } from '@/types'

export const Wallets: Wallet[] = [
  {
    connector: Connectors.Injected,
    name: 'MetaMask',
    icon: 'metamask.svg',
    description: 'Easy-to-use browser extension.',
    recommended: true
  },
  {
    connector: Connectors.WalletConnect,
    name: 'WalletConnect',
    icon: 'walletconnect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    mobile: true
  },
  {
    connector: Connectors.CoinbaseWallet,
    name: 'CoinbaseWallet',
    icon: 'coinbase-wallet.svg',
    description: 'Coinbase Wallet is a self-custody crypto wallet.'
  },
  {
    connector: Connectors.BSC,
    name: 'Binance Chain Wallet',
    icon: 'binance-chain-wallet.svg',
    description: 'Login using Binance hosted wallet'
  }
]
