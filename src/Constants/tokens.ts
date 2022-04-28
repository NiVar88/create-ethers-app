import { setAddress } from '@/Utils/ethers'
import { ChainId, Token } from '@/Types'

export const Tokens: Record<string, Token> = {
  BNB: {
    id: '.bnb',
    icon: '/static/images/tokens/BNB.svg',
    name: 'BNB',
    symbol: 'BNB',
    address: setAddress({
      [ChainId.BSC]: null,
      [ChainId.BSC_TESTNET]: '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F'
    }),
    native: true
  },

  WBNB: {
    id: '.wbnb',
    icon: '/static/images/tokens/BNB.svg',
    name: 'Wrapped BNB',
    symbol: 'WBNB',
    address: setAddress({
      [ChainId.BSC]: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      [ChainId.BSC_TESTNET]: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd'
    })
  },

  BTCB: {
    id: '.btcb',
    icon: '/static/images/tokens/BTC.svg',
    name: 'Binance BTC',
    symbol: 'BTCB',
    address: setAddress({
      [ChainId.BSC]: null,
      [ChainId.BSC_TESTNET]: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'
    })
  },

  BUSD: {
    id: '.busd',
    icon: '/static/images/tokens/BUSD.svg',
    name: 'Binance-Peg BUSD Token (BUSD)',
    symbol: 'BUSD',
    address: setAddress({
      [ChainId.BSC]: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      [ChainId.BSC_TESTNET]: '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7'
    })
  },

  USDT: {
    id: '.usdt',
    icon: '/static/images/tokens/USDT.svg',
    name: 'Binance-Peg BSC-USD (BSC-USD)',
    symbol: 'USDT',
    address: setAddress({
      [ChainId.BSC]: '0x55d398326f99059fF775485246999027B3197955',
      [ChainId.BSC_TESTNET]: '0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684'
    })
  },

  ETH: {
    id: '.eth',
    icon: '/static/images/tokens/ETH.svg',
    name: 'ETH Token',
    symbol: 'ETH',
    address: setAddress({
      [ChainId.BSC]: null,
      [ChainId.BSC_TESTNET]: '0x8BaBbB98678facC7342735486C851ABD7A0d17Ca'
    })
  },

  DAI: {
    id: '.dai',
    icon: '/static/images/tokens/DAI.svg',
    name: 'DAI Token',
    symbol: 'DAI',
    address: setAddress({
      [ChainId.BSC]: null,
      [ChainId.BSC_TESTNET]: '0x8a9424745056Eb399FD19a0EC26A14316684e274'
    })
  },

  CAKE: {
    id: '.cake',
    icon: '/static/images/tokens/CAKE.svg',
    name: 'PancakeSwap Token',
    symbol: 'CAKE',
    address: setAddress({
      [ChainId.BSC]: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
      [ChainId.BSC_TESTNET]: '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe'
    })
  },

  DOGE: {
    id: '.doge',
    icon: '/static/images/tokens/DOGE.svg',
    name: 'Binance-Peg Dogecoin',
    symbol: 'DOGE',
    address: setAddress({
      [ChainId.BSC]: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
      [ChainId.BSC_TESTNET]: null
    })
  },

  DOT: {
    id: '.dot',
    icon: '/static/images/tokens/DOT.svg',
    name: 'Binance-Peg Polkadot Token',
    symbol: 'DOT',
    address: setAddress({
      [ChainId.BSC]: '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402',
      [ChainId.BSC_TESTNET]: null
    })
  },

  LTC: {
    id: '.ltc',
    icon: '/static/images/tokens/LTC.svg',
    name: 'Binance-Peg Litecoin Token',
    symbol: 'LTC',
    address: setAddress({
      [ChainId.BSC]: '0x4338665CBB7B2485A8855A139b75D5e34AB0DB94',
      [ChainId.BSC_TESTNET]: null
    })
  },

  LINK: {
    id: '.link',
    icon: '/static/images/tokens/LINK.svg',
    name: 'Binance-Peg ChainLink Token',
    symbol: 'LINK',
    address: setAddress({
      [ChainId.BSC]: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
      [ChainId.BSC_TESTNET]: null
    })
  },

  SHIB: {
    id: '.shib',
    icon: '/static/images/tokens/SHIBA.svg',
    name: 'Binance-Peg Shiba Token',
    symbol: 'SHIB',
    address: setAddress({
      [ChainId.BSC]: '0x00e1656e45f18ec6747F5a8496Fd39B50b38396D',
      [ChainId.BSC_TESTNET]: null
    })
  },

  LUNA: {
    id: '.luna',
    icon: '/static/images/tokens/LUNA.svg',
    name: 'Binance-Peg LUNA Token',
    symbol: 'LUNA',
    address: setAddress({
      [ChainId.BSC]: '0x037838b556d9c9d654148a284682C55bB5f56eF4',
      [ChainId.BSC_TESTNET]: null
    })
  },

  AVAX: {
    id: '.avax',
    icon: '/static/images/tokens/AVAX.svg',
    name: 'Binance-Peg AVAX Token',
    symbol: 'AVAX',
    address: setAddress({
      [ChainId.BSC]: '0x715D400F88C167884bbCc41C5FeA407ed4D2f8A0',
      [ChainId.BSC_TESTNET]: null
    })
  },

  PEACH: {
    id: '.peach',
    icon: '/static/images/tokens/PEACH.svg',
    name: 'PEACH Token',
    symbol: 'PEACH',
    address: setAddress({
      [ChainId.BSC]: null,
      [ChainId.BSC_TESTNET]: '0x5081F7d88Cba44e88225Cb177c41e16c1635e22A'
    })
  }
}

export const tokens = Object.values(Tokens)
