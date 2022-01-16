import { ReactNode } from 'react'

export interface Props {
  children: ReactNode
  content: ReactNode
}

export function TooltipComponent({ children, content }: Props) {
  // __RENDER
  return (
    <div className='ui--tooltip'>
      {children}

      <div className='ui--tooltip-container'>
        <div className='ui--tooltip-inner'>{content}</div>
      </div>
    </div>
  )
}
