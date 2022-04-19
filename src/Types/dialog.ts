import { ReactChild, ReactFragment, ReactPortal } from 'react'

export enum IDialog {
  DEMO = '@DIALOG:DEMO'
}

export type DialogChildren = ReactChild | ReactFragment | ReactPortal | IDialog | string

export interface Dialog {
  visible: boolean
  type?: 'alert' | 'confirm'
  title?: string
  children: DialogChildren | null
  confirmLabel?: string
  cancelLabel?: string
  resolve?: (value: DialogResults | PromiseLike<DialogResults>) => void
}

export interface DialogOptions extends Omit<Dialog, 'visible' | 'children' | 'resolve'> {}

export interface DialogResults {
  isConfirmed: boolean
  isDenied: boolean
}
