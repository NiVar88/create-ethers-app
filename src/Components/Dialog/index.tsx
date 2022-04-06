import { useCallback, useEffect, useMemo, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useAppDispatch, useAppSelector, appActions, appSelector } from '@/Collects'
import { scrollOff } from '@/Utils'
import { Dialog } from '@/Types'
import { getCurrentContant } from './register'

export function DialogContainer() {
  // __STATE <React.Hooks>
  const dispatch = useAppDispatch()
  const state = useAppSelector(appSelector.getDialog)

  const nodeRef = useRef<HTMLDivElement>(null)
  const btnConfirm = useRef<HTMLButtonElement>(null)
  const useConfirm = useMemo(() => state.type === 'confirm', [state.type])

  // __EFFECTS <React.Hooks>
  useEffect(() => {
    function listener({ code }: KeyboardEvent) {
      switch (code) {
        case 'Enter' || 'Space':
          handleClose()
          break

        case 'Escape':
          handleClose(false)
          break
      }
    }

    if (state.visible) {
      addEventListener('keydown', listener)
      if (btnConfirm.current) btnConfirm.current.focus()
    } else {
      removeEventListener('keydown', listener)
    }

    return () => removeEventListener('keydown', listener)
  }, [state, btnConfirm])

  // __FUNCTIONS
  const handleClose = useCallback(
    (value: boolean = true) => {
      if (state.resolve) {
        state.resolve({
          isConfirmed: value,
          isDenied: !value
        })
      }

      const payload: Dialog = {
        ...state,
        visible: false,
        resolve: void 0
      }

      dispatch(appActions.setDialog(payload))
    },
    [state, dispatch]
  )

  const handleOnExited = useCallback(() => {
    dispatch(appActions.setDialog({ visible: false, children: null }))
    scrollOff(false)
  }, [dispatch])

  // __RENDER
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={state.visible}
      timeout={128}
      unmountOnExit={true}
      onEnter={() => scrollOff(true)}
      onExited={handleOnExited}
    >
      <div className='ui--modal-wrapper is-dialog' ref={nodeRef}>
        <div className='ui--modal-container'>
          <div className='ui--modal-header'>
            <div className='title'>{state.title || 'System Alert'}</div>

            <button className='btn btn-close' title='Close.' onClick={() => handleClose(false)}>
              <span className='icon bi bi-x-lg'></span>
            </button>
          </div>

          <div className='ui--modal-boby'>{getCurrentContant(state)}</div>

          <div className='ui--modal-footer'>
            {useConfirm && (
              <button className='btn btn-overlay btn-close' onClick={() => handleClose(false)}>
                <span className='text'>{state.cancelLabel}</span>
              </button>
            )}

            <button className='btn btn-primary btn-confirm' ref={btnConfirm} onClick={() => handleClose()}>
              <span className='text'>{state.confirmLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}
