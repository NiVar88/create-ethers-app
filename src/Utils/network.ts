import { configs, RPCS } from '@/Constants'
import { ChainId, Connectors, Token } from '@/Types'
import { getCookie } from './cookies'

export function setNetwork() {
  const { ethereum, BinanceChain: binance } = window

  const connectorName: Connectors = getCookie(configs.APP_USER_CONNECTOR)

  switch (connectorName) {
    case Connectors.Injected:
      if (!ethereum) return void 0

      const chainId: ChainId = configs.DEFAULT_CHAIN_ID
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
                chainName: configs.isMainnet ? 'Binance Smart Chain' : 'Binance Smart Chain Testnet',
                nativeCurrency: {
                  name: 'Binance',
                  symbol: 'BNB',
                  decimals: 18
                },
                rpcUrls: RPCS[chainId],
                blockExplorerUrls: [configs.BLOCK_EXPLORER]
              }
            ]
          })
        }
      }
      break

    case Connectors.BSC:
      if (binance) binance.switchNetwork(configs.isMainnet ? 'bsc-mainnet' : 'bsc-testnet')
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
          image: `${configs.APP_BASE_URL}${token.icon}`
        }
      }
    })
  }
}
