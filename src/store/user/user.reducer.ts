import { createReducer } from '@reduxjs/toolkit'
import { parseUnits } from 'ethers/lib/utils'
import { configs } from '@/constants'
import { storage } from '@/utils/storage'
import { setProfile, setGasPrice, setCurrencyBalance } from './user.actions'
import { initialState } from './user.state'

export default createReducer(initialState, (builder) => {
  return builder
    .addCase(setProfile, (state, { payload }) => {
      const profile = payload ? { ...state.profile, ...payload } : payload
      state.profile = profile

      if (profile) {
        storage.set(configs.APP_USER_INFO, profile)
      }
    })
    .addCase(setGasPrice, (state, { payload }) => {
      state.gasPrice = parseUnits(payload, 'gwei').toString()
    })
    .addCase(setCurrencyBalance, (state, { payload }) => {
      state.currencyBalances = payload
    })
})
