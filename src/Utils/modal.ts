import { dispatch, appActions } from '@/Store'
import { generateId } from '@/Utils'
import { ModalChildren, ModalOptions } from '@/Types'

export class modal {
  /**
   * Open modal
   *
   * @param {ModalChild} children
   * @param {ModalOptions} options
   * @returns vid
   */
  static on(children: ModalChildren, options?: ModalOptions) {
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
