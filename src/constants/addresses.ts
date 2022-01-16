import { ChainId } from '@/types'
import { setAddress } from './utils'

export type KeyNames = 'multicall' | 'masterChef' | 'pancakeRouter'

export const Addresses: Record<KeyNames, string> = {
  multicall: setAddress({
    [ChainId.BSC]: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
    [ChainId.BSC_TESTNET]: '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576'
  }),
  masterChef: setAddress({
    [ChainId.BSC]: null,
    [ChainId.BSC_TESTNET]: '0x90dbbd2b7e477dB6375C0f7AbB88f66F0bda412c'
  }),
  pancakeRouter: setAddress({
    [ChainId.BSC]: null,
    [ChainId.BSC_TESTNET]: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3'
  })
}
