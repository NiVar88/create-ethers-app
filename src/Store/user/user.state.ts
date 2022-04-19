import { configs, GAS_PRICE_GWEI } from '@/Constants'
import { getCookie } from '@/Utils'
import { CurrencyBalance, User } from '@/Types'

interface UserState {
  profile: User | null
  gasPrice: string
  currencyBalances: CurrencyBalance[]
}

export const initialState: UserState = {
  profile: getCookie(configs.APP_USER_INFO, true) || null,
  gasPrice: GAS_PRICE_GWEI.default,
  currencyBalances: []
}
