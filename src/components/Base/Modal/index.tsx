import { useCallback, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useAppDispatch, useAppSelector, appActions, appSelector } from '@/store'
import { modal, scrollOff } from '@/utils'
import { Modal } from '@/types'
import { getCurrentContant } from './register'
import cls from 'classnames'

export function ModalContainer() {
  // __STATE <React.Hooks>
  const dispatch = useAppDispatch()
  const state = useAppSelector(appSelector.getModal)

  const nodeRef = useRef<HTMLDivElement>(null)

  // __EFFECTS <React.Hooks>
  useEffect(() => {
    function listener({ code }: KeyboardEvent) {
      if (code === 'Escape') modal.off()
    }

    if (state.visible) addEventListener('keydown', listener)
    else removeEventListener('keydown', listener)

    return () => removeEventListener('keydown', listener)
  }, [state])

  // __FUNCTIONS
  const handleOnExited = useCallback(() => {
    const payload: Modal = {
      visible: false,
      name: void 0,
      title: void 0,
      children: null
    }

    dispatch(appActions.setModal(payload))
    scrollOff(false)
  }, [])

  // __RENDER
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={state.visible}
      timeout={256}
      unmountOnExit={true}
      onEnter={() => scrollOff(true)}
      onExited={handleOnExited}
    >
      <div className='ui--modal is-default' ref={nodeRef}>
        <div className={cls('ui--modal-container', state.name)}>
          <div className='ui--modal-header'>
            <div className='title'>{state.title || 'Text title.'}</div>

            <button className='btn btn-close' title='Close.' onClick={modal.off}>
              <span className='icon bi bi-x-lg'></span>
            </button>
          </div>

          <div className='ui--modal-boby'>{getCurrentContant(state)}</div>
        </div>
      </div>
    </CSSTransition>
  )
}
