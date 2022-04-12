import { ReactChild, ReactFragment, ReactPortal } from 'react'
import { dispatch, appActions } from '@/Store'
import { generateId } from '@/Utils'
import { IModal } from '@/Types'

export type ModalChild = ReactChild | ReactFragment | ReactPortal | IModal

export interface Modal {
  vid: string
  visible: boolean
  className?: string
  allowEscape?: boolean
  children: ModalChild | null
}

export interface ModalOptions extends Pick<Modal, 'className' | 'allowEscape'> {}

export class modal {
  /**
   * Open modal
   *
   * @param {ModalChild} children
   * @param {ModalOptions} options
   * @returns vid
   */
  static on(children: ModalChild, options?: ModalOptions) {
    const vid = generateId()
    const action = appActions.setModal({
      vid,
      visible: true,
      className: options?.className,
      allowEscape: options?.allowEscape || true,
      children
    })

    dispatch(action)

    return vid
  }

  /**
   * Close modal by vid
   *
   * @param {string} vid
   */
  static off(vid: string) {
    const action = appActions.setModal({
      vid,
      visible: false,
      children: null
    })

    dispatch(action)
  }
}
