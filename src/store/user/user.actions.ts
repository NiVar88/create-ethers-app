import { createAction } from '@reduxjs/toolkit'
import { GAS_PRICE } from '@/constants'
import { User } from '@/types'

export enum ActionTypes {
  SET_AUTH = 'SET_USER_AUTHENTICATED',
  SET_PROFILE = 'SET_USER_USER_PROFILE',
  SET_GAS = 'SET_USER_GAS_PRICE'
}

export const setAuthenticated = createAction<string | null, ActionTypes.SET_AUTH>(ActionTypes.SET_AUTH)
export const setProfile = createAction<User | null, ActionTypes.SET_PROFILE>(ActionTypes.SET_PROFILE)
export const setGasPrice = createAction<GAS_PRICE, ActionTypes.SET_GAS>(ActionTypes.SET_GAS)
