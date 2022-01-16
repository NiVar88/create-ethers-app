import { Dialog, Modal, Notice, Theme } from '@/types'

interface Block {
  currentBlock: number
  initialBlock: number
}

interface AppState {
  appVersion: string
  lang: string
  theme: Theme
  dialog: Dialog
  modal: Modal
  notice: Notice[]
  block: Block
}

export const initialState: AppState = {
  appVersion: 'v0.1-beta (Jan, 2022)',
  lang: 'en-US',
  theme: 'default',
  dialog: {
    visible: false,
    type: 'alert',
    children: null
  },
  modal: {
    visible: false,
    children: null
  },
  notice: [],
  block: {
    currentBlock: 0,
    initialBlock: 0
  }
}
