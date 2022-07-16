import { useMemo, useEffect, useState, useRef, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'
import type { Notice } from '@/types'
import { getCurrentContant } from './register'
import cls from 'classnames'

export interface NoticeItemProps {
  record: Notice
  icon: string
  onRemove: (notice: Notice) => void
}

export function NoticeItem({ record, icon, onRemove }: NoticeItemProps) {
  // __STATE <React.Hooks>
  const nodeRef = useRef<HTMLDivElement>(null)

  const [visible, setVisible] = useState<boolean>(false)
  const duration = useMemo(() => record.duration, [])

  // __EFFECTS
  useEffect(() => {
    if (record.visible) {
      setTimeout(() => setVisible(true), 64)
    } else {
      setVisible(false)
    }
  }, [record])

  useEffect(() => {
    if (duration) {
      const timeoutId = setTimeout(() => setVisible(false), duration + 320)
      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [duration])

  // __RENDER
  return (
    <CSSTransition nodeRef={nodeRef} in={visible} timeout={320} unmountOnExit={true} onExited={() => onRemove(record)}>
      <div className='ui--notice-item' ref={nodeRef}>
        <div className={cls('ui--notice-icon', record.type)}>
          <span className={cls('icon', 'bi', icon)}></span>
        </div>

        <div className='ui--notice-content'>
          <h4 className='title'>{record.title}</h4>
          <div className='content'>{getCurrentContant(record)}</div>
        </div>

        <div className='ui--notice-close'>
          <button className='btn btn-close' title='Close.' onClick={() => setVisible(false)}>
            <span className='icon bi bi-x-lg'></span>
          </button>
        </div>
      </div>
    </CSSTransition>
  )
}
