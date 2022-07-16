import { useCallback } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { configs, ChainId, RPCS } from '@/constants'
import { useWeb3ReactCore } from '@/hooks'
import { getCurrentConnector } from '@/utils/ethers'

export function NetworkAlert() {
  // __STATE <React.Hooks>
  const { library } = useWeb3ReactCore<Web3Provider>()

  // __FUNCTIONS
  const handleClick = useCallback(() => {
    const connectorName = getCurrentConnector()

    if (!connectorName || !library?.provider.request) return void 0

    const chainId: ChainId = configs.DEFAULT_CHAIN_ID
    const useReq = library.provider.request

    // check if the chain to connect to is installed
    useReq({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }]
    }).catch((error) => {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        useReq({
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
    })
  }, [library])

  // __RETURN
  return (
    <div className='ui--notice-network'>
      <span className='desc'>Switch your network,</span>
      <button className='btn btn-text btn-switch' onClick={handleClick}>
        <span className='text'>Click here</span>
      </button>
    </div>
  )
}
