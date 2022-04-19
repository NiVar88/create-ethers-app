import { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { appActions } from '@/Store'
import { generateId } from '@/Utils'
import { ModalChildren, ModalOptions } from '@/Types'

export function useModal(options?: ModalOptions): CallbackInterface {
  // __STATE <React.Hooks>
  const dispatch = useDispatch()
  const vid = useMemo(() => generateId(), [])

  // __FUNCTIONS
  const on = useCallback(
    (children: ModalChildren) => {
      const action = appActions.setModal({
        vid,
        visible: true,
        className: options?.className,
        allowEscape: options?.allowEscape || true,
        children
      })

      dispatch(action)
    },
    [options]
  )

  const off = useCallback(() => {
    const action = appActions.setModal({
      vid,
      visible: false,
      children: null
    })

    dispatch(action)
  }, [])

  // __RETURN
  return useMemo(() => ({ on, off }), [on, off])
}

export interface CallbackInterface {
  /**
   * Open modal
   *
   * @param {ModalChild} children
   * @param {ModalOptions} options
   */
  on: (children: ModalChildren, options?: ModalOptions) => void

  /**
   * Close modal
   */
  off: () => void
}
