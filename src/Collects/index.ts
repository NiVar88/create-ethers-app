import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { configs } from '@/Constants'

import app from './app/app.reducer'
import user from './user/user.reducer'

const createReducer = combineReducers({
  app,
  user
})

const createStore = configureStore({
  reducer: createReducer,
  devTools: configs.isDevelop,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false })
  }
})

export type StoreTypes = ReturnType<typeof createStore.getState>
export type StoreDispatch = typeof createStore.dispatch
export type StoreThunk<ReturnType = void> = ThunkAction<ReturnType, StoreTypes, unknown, Action<string>>

export { createStore as Store }
export const useAppDispatch = () => useDispatch<StoreDispatch>()
export const useAppSelector = useSelector
export const { dispatch } = createStore

export * as appActions from './app/app.actions'
export * as appSelector from './app/app.selectors'
export * as userActions from './user/user.actions'
export * as userSelector from './user/user.selectors'
