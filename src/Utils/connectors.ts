import { ethers } from 'ethers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { RPCS } from '@/Constants'
import { ChainId, Connectors } from '@/Types'
import { getRpcUrl } from './web3'

const RPC_URL = getRpcUrl()
const supportedChainIds = [ChainId.BSC, ChainId.BSC_TESTNET]

export function getLibrary(provider: any) {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 1e4
  return library
}

export const injected = new InjectedConnector({ supportedChainIds })
export const bsc = new BscConnector({ supportedChainIds })
export const walletconnect = new WalletConnectConnector({
  rpc: {
    [ChainId.BSC]: RPCS[ChainId.BSC][0],
    [ChainId.BSC_TESTNET]: RPCS[ChainId.BSC_TESTNET][0]
  },
  qrcode: true
})

export const connectorsBy: Record<Connectors, AbstractConnector> = {
  [Connectors.Injected]: injected,
  [Connectors.BSC]: bsc,
  [Connectors.WalletConnect]: walletconnect
}

export const simpleRpcProvider = new ethers.providers.StaticJsonRpcProvider(RPC_URL)
