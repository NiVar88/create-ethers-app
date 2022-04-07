import { ChainId } from '@/Types'

export const APP_MODE = process.env.NODE_ENV
export const APP_NAME = process.env.REACT_APP_NAME || 'project_alice'
export const APP_BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080'
export const APP_CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID || '97', 10)
export const API_SECRET_KEY = process.env.REACT_APP_API_SECRET_KEY || 'AP1-S3C23T-K3Y'
export const API_GATEWAY = process.env.REACT_APP_API_GATEWAY || 'http://localhost:3030'
export const WS_GATEWAY = process.env.REACT_APP_WS_GATEWAY || 'ws://127.0.0.1:5052'

export const isBrowser = typeof window !== 'undefined'
export const isProduction = APP_MODE === 'production'
export const isDevelop = APP_MODE === 'development'
export const isMainnet = APP_CHAIN_ID === ChainId.BSC
export const isTestnet = APP_CHAIN_ID === ChainId.BSC_TESTNET

export const BLOCK_TIME = 3
export const SECONDS_PER_YEAR = 365 * 24 * 60 * 60
export const BLOCKS_IN_A_YEAR = SECONDS_PER_YEAR / BLOCK_TIME
export const DEFAULT_CHAIN_ID = isMainnet ? ChainId.BSC : ChainId.BSC_TESTNET
export const BLOCK_EXPLORER = isMainnet ? 'https://bscscan.com' : 'https://testnet.bscscan.com'

// STORAGE KEY-NAME
export const APP_LANG = 'APP.Language'
export const APP_THEME = 'APP.Theme'
export const APP_AUTH_ACCESS = 'APP.AccessToken'
export const APP_AUTH_REFRESH = 'APP.RefreshToken'
export const APP_USER_CONNECTOR = 'APP.WalletConnector'
export const APP_USER_ADDRESS = 'APP.UserAddress'
export const APP_USER_INFO = 'APP.UserInfo'

// REQUEST HEADERS
export const AUTH_ACCESS = 'Authorization'
export const AUTH_ADDRESS = 'User-Address'
export const CONTENT_LANG = 'Content-Language'
export const XSRF_TOKEN = 'XSRF-TOKEN'
export const X_CSRF_TOKEN = 'X-CSRF-TOKEN'

// STATIC
export const IPFS_GATEWAY = 'https://ipfs.io/ipfs'
