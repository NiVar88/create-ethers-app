import { Theme } from '@/constants'
import { Dialog, Modal, Notice } from '@/types'

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
  appVersion: 'v0.1-beta (July, 2022)',
  lang: 'en-US',
  theme: Theme.DEFAULT,
  loader: false,
  dialog: {
    visible: false,
    type: 'alert',
    content: null
  },
  modal: [],
  notice: []
}
