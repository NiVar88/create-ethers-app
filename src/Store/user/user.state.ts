import { configs, GAS_PRICE_GWEI } from '@/Constants'
import { getCookie } from '@/Utils'
import { CurrencyBalance, User } from '@/Types'

interface UserState {
  address: string | null
  profile: User | null
  gasPrice: string
  currencyBalances: CurrencyBalance[]
}

export const initialState: UserState = {
  address: getCookie(configs.APP_USER_ADDRESS) || null,
  profile: null,
  gasPrice: GAS_PRICE_GWEI.default,
  currencyBalances: []
}
