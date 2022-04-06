import { ReactNode, useEffect, useRef, useState } from 'react'
import { modal } from '@/Utils'

export interface Props {
  title: string
  children: ReactNode
}

export function ModalComponent({ title, children }: Props) {
  // __STATE <React.Hooks>
  const rootElm = useRef<HTMLDivElement>(null)
  const [vid, setVid] = useState<string>('')

  // __EFFECTS <React.Hooks>
  useEffect(() => {
    if (rootElm.current) {
      const elm = rootElm.current.parentElement!
      setVid(elm.dataset.vid!)
    }
  }, [rootElm])

  // __RENDER
  return (
    <>
      <div className='ui--modal-header' ref={rootElm}>
        <div className='title'>{title}</div>

        <button className='btn btn-close' title='Close.' onClick={() => modal.off(vid)}>
          <span className='icon bi bi-x-lg'></span>
        </button>
      </div>

      {children}
    </>
  )
}
