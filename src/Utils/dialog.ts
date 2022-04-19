import { dispatch, appActions } from '@/Store'
import { DialogChildren, DialogOptions, DialogResults } from '@/Types'

/**
 * Alert box.
 *
 * @param {DialogOptions | string} options
 */
export async function dialog(children: DialogChildren, options?: DialogOptions): Promise<DialogResults> {
  return new Promise((resolve) => {
    const action = appActions.setDialog({
      visible: true,
      children,
      resolve,
      ...options
    })

    dispatch(action)
  })
}
