import { RPCS } from '@/constants'
import { APP_BASE_URL, APP_CONNECTOR, BLOCK_EXPLORER, DEFAULT_CHAIN_ID, isMainnet } from '@/libs/configs'
import { getCookie } from '@/libs/cookies'
import { ChainId, Connectors, Token } from '@/types'

export function setNetwork() {
  const { ethereum, BinanceChain: binance } = window

  if (!ethereum || !binance) return void 0

  const connectorName: Connectors = getCookie(APP_CONNECTOR)
  const chainId: ChainId = DEFAULT_CHAIN_ID

  switch (connectorName) {
    case Connectors.Injected:
      try {
        // check if the chain to connect to is installed
        ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }]
        })
      } catch (error: any) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
          ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: isMainnet ? 'Binance Smart Chain' : 'Binance Smart Chain Testnet',
                nativeCurrency: {
                  name: 'Binance',
                  symbol: 'BNB',
                  decimals: 18
                },
                rpcUrls: RPCS[chainId],
                blockExplorerUrls: [BLOCK_EXPLORER]
              }
            ]
          })
        }
      }
      break

    case Connectors.BSC:
      binance.switchNetwork(isMainnet ? 'bsc-mainnet' : 'bsc-testnet')
      break
  }
}

export function registerToken(token: Token) {
  const { ethereum } = window

  if (ethereum) {
    ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: token.decimals || 18,
          image: `${APP_BASE_URL}${token.icon}`
        }
      }
    })
  }
}
