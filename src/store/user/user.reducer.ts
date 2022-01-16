import { createReducer } from '@reduxjs/toolkit'
import { parseUnits } from 'ethers/lib/utils'
import { setAuthenticated, setProfile, setGasPrice } from './user.actions'
import { initialState } from './user.state'

export default createReducer(initialState, (builder) => {
  return builder
    .addCase(setAuthenticated, (state, { payload }) => {
      state.address = payload
    })
    .addCase(setProfile, (state, { payload }) => {
      state.profile = payload ? { ...state.profile, ...payload } : payload
    })
    .addCase(setGasPrice, (state, { payload }) => {
      state.gasPrice = parseUnits(payload, 'gwei').toString()
    })
})
