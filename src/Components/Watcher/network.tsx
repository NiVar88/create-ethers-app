import { useCallback, useRef } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { configs, RPCS } from '@/Constants'
import { useNoticeItem } from '@/Hooks'
import { ChainId, Connectors } from '@/Types'
import { getCurrentConnector } from '@/Utils/ethers'

export interface Props {
  library: Web3Provider
}

export function NetworkAlertComponent({ library }: Props) {
  // __STATE <React.Hooks>
  const nodeRef = useRef<HTMLDivElement>(null)
  const notice = useNoticeItem(nodeRef)

  // __FUNCTIONS
  const handleClick = useCallback(() => {
    const connectorName = getCurrentConnector()

    if (!connectorName || !library.provider.request) return void 0
    switch (connectorName) {
      case Connectors.BSC:
        const { BinanceChain: binance } = window
        if (binance) binance.switchNetwork(configs.isMainnet ? 'bsc-mainnet' : 'bsc-testnet')
        break

      default:
        const chainId: ChainId = configs.DEFAULT_CHAIN_ID
        try {
          // check if the chain to connect to is installed
          library.provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId.toString(16)}` }]
          })
        } catch (error: any) {
          // This error code indicates that the chain has not been added to MetaMask
          // if it is not, then install it into the user MetaMask
          if (error.code === 4902) {
            library.provider.request({
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
    }
  }, [library])

  // __RETURN
  return (
    <div className='ui--notice-network' ref={nodeRef}>
      <span className='desc'>Switch your network,</span>
      <button className='btn btn-text btn-switch' onClick={handleClick}>
        <span className='text'>Click here</span>
      </button>
    </div>
  )
}
