import { createAction } from '@reduxjs/toolkit'
import { Theme } from '@/constants'
import { Dialog, Modal, Notice } from '@/types'

export enum ActionTypes {
  SET_LANG = 'SET_APP_LANGUAGE',
  SET_THEME = 'SET_APP_THEME',
  SET_LOADER = 'SET_APP_LOADER',
  SET_DIALOG = 'SET_APP_DIALOG',
  SET_MODALS = 'SET_APP_MODALS',
  SET_NOTICE = 'SET_APP_NOTICE'
}

export const setLanguage = createAction<string, ActionTypes.SET_LANG>(ActionTypes.SET_LANG)
export const setTheme = createAction<Theme, ActionTypes.SET_THEME>(ActionTypes.SET_THEME)
export const setLoader = createAction<boolean, ActionTypes.SET_LOADER>(ActionTypes.SET_LOADER)
export const setDialog = createAction<Dialog, ActionTypes.SET_DIALOG>(ActionTypes.SET_DIALOG)
export const setModal = createAction<Modal, ActionTypes.SET_MODALS>(ActionTypes.SET_MODALS)
export const setNotice = createAction<Notice | null, ActionTypes.SET_NOTICE>(ActionTypes.SET_NOTICE)
