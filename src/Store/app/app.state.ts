import { Dialog, Modal, Notice, Theme } from '@/Types'

interface AppState {
  appVersion: string
  lang: string
  theme: Theme
  loader: boolean
  dialog: Dialog
  modal: Modal[]
  notice: Notice[]
}

export const initialState: AppState = {
  appVersion: 'v0.1-beta (Mar, 2022)',
  lang: 'en-US',
  theme: Theme.LIGHT,
  loader: false,
  dialog: {
    visible: false,
    type: 'alert',
    children: null
  },
  modal: [],
  notice: []
}
