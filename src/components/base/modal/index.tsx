import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appActions, appSelector } from '@/store'
import { modal, scrollOff } from '@/utils'
import { ModalItem } from './item'
import { getCurrentContant } from './register'
import cls from 'classnames'

export default function ModalContainer() {
  // __STATE <React.Hooks>
  const nodeRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const modals = useSelector(appSelector.getModal)

  // __FUNCTIONS
  const handleExited = useCallback((vid: string) => {
    const action = appActions.setModal({
      vid: `rm:${vid}`,
      visible: false,
      content: null
    })

    dispatch(action)
    scrollOff(false)
  }, [])

  // __EFFECTS
  useEffect(() => {
    function listener({ code }: KeyboardEvent) {
      if (code === 'Escape') {
        const { vid, allowEscape } = modals.slice(-1)[0]
        if (allowEscape) modal.off(vid)
      }
    }

    if (modals.length) {
      scrollOff(true)
      addEventListener('keydown', listener)
    } else {
      scrollOff(false)
      removeEventListener('keydown', listener)
    }

    return () => {
      removeEventListener('keydown', listener)
    }
  }, [modals])

  // __RENDER
  return (
    <div className={cls('ui--modal', { none: !modals.length })} ref={nodeRef}>
      {modals.map((modal, index) => (
        <ModalItem
          key={modal.vid}
          index={index}
          className={modal.className}
          vid={modal.vid}
          visible={modal.visible}
          children={getCurrentContant(modal)}
          onExited={handleExited}
        />
      ))}
    </div>
  )
}
