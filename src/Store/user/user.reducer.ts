import { createReducer } from '@reduxjs/toolkit'
import { parseUnits } from 'ethers/lib/utils'
import { configs } from '@/Constants'
import { attrCookie, removeCookie, setCookie } from '@/Utils'
import { setProfile, setGasPrice, setCurrencyBalance } from './user.actions'
import { initialState } from './user.state'

export default createReducer(initialState, (builder) => {
  return builder
    .addCase(setProfile, (state, { payload }) => {
      const profile = payload ? { ...state.profile, ...payload } : payload
      state.profile = profile

      const options = attrCookie()
      if (profile) {
        setCookie(configs.APP_USER_INFO, profile, options)
      } else {
        removeCookie(configs.APP_USER_INFO, options)
      }
    })
    .addCase(setGasPrice, (state, { payload }) => {
      state.gasPrice = parseUnits(payload, 'gwei').toString()
    })
    .addCase(setCurrencyBalance, (state, { payload }) => {
      state.currencyBalances = payload
    })
})
