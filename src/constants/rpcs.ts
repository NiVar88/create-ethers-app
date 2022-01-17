import { SupportedChainId } from '@/types'

export const RPCS: Record<SupportedChainId, string[]> = {
  [SupportedChainId.ARBITRUM]: ['https://arb1.arbitrum.io/rpc'],
  [SupportedChainId.ARBITRUM_TESTNET]: ['https://rinkeby.arbitrum.io/rpc'],

  [SupportedChainId.AURORA]: ['https://mainnet.aurora.dev'],
  [SupportedChainId.AURORA_TESTNET]: ['https://testnet.aurora.dev'],

  [SupportedChainId.AVAX]: ['https://api.avax.network/ext/bc/C/rpc'],
  [SupportedChainId.AVAX_TESTNET]: ['https://api.avax-test.network/ext/bc/C/rpc'],

  [SupportedChainId.BSC]: ['https://bsc-dataseed.binance.org'],
  [SupportedChainId.BSC_TESTNET]: [
    // 'https://data-seed-prebsc-1-s1.binance.org:8545'
    'https://data-seed-prebsc-1-s2.binance.org:8545'
    // 'https://data-seed-prebsc-1-s3.binance.org:8545'
  ],

  [SupportedChainId.FANTOM]: ['https://rpc.ftm.tools'],
  [SupportedChainId.FANTOM_TESTNET]: ['https://rpc.testnet.fantom.network'],

  [SupportedChainId.HARMONY]: [
    'https://api.harmony.one',
    'https://s1.api.harmony.one',
    'https://s2.api.harmony.one',
    'https://s3.api.harmony.one'
  ],
  [SupportedChainId.HARMONY_TESTNET]: [
    'https://api.s0.b.hmny.io',
    'https://api.s1.b.hmny.io',
    'https://api.s2.b.hmny.io',
    'https://api.s3.b.hmny.io'
  ],

  [SupportedChainId.HECO]: ['https://http-mainnet.hecochain.com'],
  [SupportedChainId.HECO_TESTNET]: ['https://http-testnet.hecochain.com'],

  [SupportedChainId.POLYGON]: ['https://rpc-mainnet.maticvigil.com'],
  [SupportedChainId.POLYGON_TESTNET]: ['https://rpc-mumbai.maticvigil.com']
}
