import { ReactChild, ReactFragment, ReactPortal } from 'react'
import { dispatch, appActions } from '@/Store'
import { IDialog } from '@/Types'

export type DialogChild = ReactChild | ReactFragment | ReactPortal | IDialog | string

export interface Dialog {
  visible: boolean
  type?: 'alert' | 'confirm'
  title?: string
  children: DialogChild | null
  confirmLabel?: string
  cancelLabel?: string
  resolve?: (value: DialogResults | PromiseLike<DialogResults>) => void
}

export interface DialogOptions extends Omit<Dialog, 'visible' | 'children' | 'resolve'> {}

export interface DialogResults {
  isConfirmed: boolean
  isDenied: boolean
}

/**
 * Alert box.
 *
 * @param {DialogOptions | string} options
 */
export async function dialog(children: DialogChild, options?: DialogOptions): Promise<DialogResults> {
  return new Promise((resolve) => {
    const payload: Dialog = {
      visible: true,
      children,
      resolve,
      ...options
    }

    dispatch(appActions.setDialog(payload))
  })
}
