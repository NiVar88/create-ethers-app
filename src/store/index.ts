import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { configs } from '@/constants'

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
export * from './modules'
export const { dispatch } = createStore
