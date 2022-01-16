import { GAS_PRICE_GWEI } from '@/constants'
import { USER_ADDRESS } from '@/libs/configs'
import { getCookie } from '@/libs/cookies'
import { User } from '@/types'

interface UserState {
  address: string | null
  profile: User | null
  gasPrice: string
}

export const initialState: UserState = {
  address: getCookie(USER_ADDRESS) || null,
  profile: null,
  gasPrice: GAS_PRICE_GWEI.default
}
