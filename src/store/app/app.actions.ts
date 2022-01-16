import { createAction } from '@reduxjs/toolkit'
import { Dialog, Modal, Notice, Theme } from '@/types'

export enum ActionTypes {
  SET_LANG = 'SET_APP_LANGUAGE',
  SET_THEME = 'SET_APP_THEME',
  SET_DIALOG = 'SET_APP_DIALOG',
  SET_MODALS = 'SET_APP_MODALS',
  SET_NOTICE = 'SET_APP_NOTICE',
  SET_BLOCK = 'SET_APP_BLOCK_NUMBER'
}

export const setLanguage = createAction<string, ActionTypes.SET_LANG>(ActionTypes.SET_LANG)
export const setTheme = createAction<Theme, ActionTypes.SET_THEME>(ActionTypes.SET_THEME)
export const setDialog = createAction<Dialog, ActionTypes.SET_DIALOG>(ActionTypes.SET_DIALOG)
export const setModal = createAction<Modal, ActionTypes.SET_MODALS>(ActionTypes.SET_MODALS)
export const setNotice = createAction<Notice | null, ActionTypes.SET_NOTICE>(ActionTypes.SET_NOTICE)
export const setBlock = createAction<number, ActionTypes.SET_BLOCK>(ActionTypes.SET_BLOCK)
