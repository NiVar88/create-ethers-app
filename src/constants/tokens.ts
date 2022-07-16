import { setAddress } from '@/utils/ethers'
import { ChainId } from './ethers'
import type { Token } from '@/types'

export const Tokens: Record<string, Token> = {
  BNB: {
    id: '.bnb',
    icon: '/static/images/tokens/BNB.svg',
    name: 'BNB',
    symbol: 'BNB',
    address: setAddress({
      [ChainId.ARKON]: null,
      [ChainId.ARKON_TESTNET]: '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F'
    }),
    isNative: true
  },

  WBNB: {
    id: '.wbnb',
    icon: '/static/images/tokens/BNB.svg',
    name: 'Wrapped BNB',
    symbol: 'WBNB',
    address: setAddress({
      [ChainId.ARKON]: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      [ChainId.ARKON_TESTNET]: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd'
    })
  },

  BTCB: {
    id: '.btcb',
    icon: '/static/images/tokens/BTC.svg',
    name: 'Binance-Peg BTCB Token (BTCB)',
    symbol: 'BTCB',
    address: setAddress({
      [ChainId.ARKON]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
      [ChainId.ARKON_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'
    })
  },

  BUSD: {
    id: '.busd',
    icon: '/static/images/tokens/BUSD.svg',
    name: 'Binance-Peg BUSD Token (BUSD)',
    symbol: 'BUSD',
    address: setAddress({
      [ChainId.ARKON]: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      [ChainId.ARKON_TESTNET]: '0x78867bbeef44f2326bf8ddd1941a4439382ef2a7'
    })
  },

  USDT: {
    id: '.usdt',
    icon: '/static/images/tokens/USDT.svg',
    name: 'Binance-Peg BSC-USD (BSC-USD)',
    symbol: 'USDT',
    address: setAddress({
      [ChainId.ARKON]: '0x55d398326f99059fF775485246999027B3197955',
      [ChainId.ARKON_TESTNET]: '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684'
    })
  },

  ETH: {
    id: '.eth',
    icon: '/static/images/tokens/ETH.svg',
    name: 'ETH Token',
    symbol: 'ETH',
    address: setAddress({
      [ChainId.ARKON]: null,
      [ChainId.ARKON_TESTNET]: '0x8BaBbB98678facC7342735486C851ABD7A0d17Ca'
    })
  },

  DAI: {
    id: '.dai',
    icon: '/static/images/tokens/DAI.svg',
    name: 'DAI Token',
    symbol: 'DAI',
    address: setAddress({
      [ChainId.ARKON]: null,
      [ChainId.ARKON_TESTNET]: '0x8a9424745056Eb399FD19a0EC26A14316684e274'
    })
  },

  CAKE: {
    id: '.cake',
    icon: '/static/images/tokens/CAKE.svg',
    name: 'PancakeSwap Token',
    symbol: 'CAKE',
    address: setAddress({
      [ChainId.ARKON]: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
      [ChainId.ARKON_TESTNET]: '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe'
    })
  },

  DOGE: {
    id: '.doge',
    icon: '/static/images/tokens/DOGE.svg',
    name: 'Binance-Peg Dogecoin',
    symbol: 'DOGE',
    address: setAddress({
      [ChainId.ARKON]: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
      [ChainId.ARKON_TESTNET]: null
    })
  },

  DOT: {
    id: '.dot',
    icon: '/static/images/tokens/DOT.svg',
    name: 'Binance-Peg Polkadot Token',
    symbol: 'DOT',
    address: setAddress({
      [ChainId.ARKON]: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
      [ChainId.ARKON_TESTNET]: null
    })
  },

  LTC: {
    id: '.ltc',
    icon: '/static/images/tokens/LTC.svg',
    name: 'Binance-Peg Litecoin Token',
    symbol: 'LTC',
    address: setAddress({
      [ChainId.ARKON]: '0x4338665CBB7B2485A8855A139b75D5e34AB0DB94',
      [ChainId.ARKON_TESTNET]: null
    })
  },

  LINK: {
    id: '.link',
    icon: '/static/images/tokens/LINK.svg',
    name: 'Binance-Peg ChainLink Token',
    symbol: 'LINK',
    address: setAddress({
      [ChainId.ARKON]: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
      [ChainId.ARKON_TESTNET]: null
    })
  },

  SHIB: {
    id: '.shib',
    icon: '/static/images/tokens/SHIBA.svg',
    name: 'Binance-Peg Shiba Token',
    symbol: 'SHIB',
    address: setAddress({
      [ChainId.ARKON]: '0x00e1656e45f18ec6747F5a8496Fd39B50b38396D',
      [ChainId.ARKON_TESTNET]: null
    })
  },

  LUNA: {
    id: '.luna',
    icon: '/static/images/tokens/LUNA.svg',
    name: 'Binance-Peg LUNA Token',
    symbol: 'LUNA',
    address: setAddress({
      [ChainId.ARKON]: '0x037838b556d9c9d654148a284682C55bB5f56eF4',
      [ChainId.ARKON_TESTNET]: null
    })
  },

  AVAX: {
    id: '.avax',
    icon: '/static/images/tokens/AVAX.svg',
    name: 'Binance-Peg AVAX Token',
    symbol: 'AVAX',
    address: setAddress({
      [ChainId.ARKON]: '0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0',
      [ChainId.ARKON_TESTNET]: null
    })
  }
}

export const tokens = Object.values(Tokens)
