import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { appSelector } from '@/Store'
import { scrollOff } from '@/Utils'

export function LoaderContainer() {
  // __STATE <React.Hooks>
  const nodeRef = useRef<HTMLDivElement>(null)
  const loader = useSelector(appSelector.getLoader)

  // __RENDER
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={loader}
      timeout={256}
      unmountOnExit={true}
      onEnter={() => scrollOff()}
      onExited={() => scrollOff(false)}
    >
      <div className='ui--loader-wrapper' ref={nodeRef} style={{ backgroundImage: 'url(/static/images/bg.webp)' }}>
        <div className='ui--loader-container'>
          <div className='ui--loader-void'></div>

          <div className='ui--loader-content'>
            <h4 className='h4'>loading</h4>
          </div>

          <div className='ui--loader-progress'>
            {Array.from({ length: 20 }).map((_, index) => (
              <div className='li' key={index}></div>
            ))}
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}
