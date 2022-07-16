import { configs, GAS_PRICE_GWEI } from '@/constants'
import { JWT } from '@/services'
import { storage } from '@/utils'
import { CurrencyBalance, User } from '@/types'

interface UserState {
  profile: User | null
  gasPrice: string
  currencyBalances: CurrencyBalance[]
}

function initProfile() {
  if (!configs.isBrowser) return null

  const refreshToken = JWT.audit(configs.APP_AUTH_REFRESH)
  const profile = storage.get<User | null>(configs.APP_USER_INFO, 1)

  return refreshToken && profile ? profile : null
}

export const initialState: UserState = {
  profile: initProfile(),
  gasPrice: GAS_PRICE_GWEI.default,
  currencyBalances: []
}
