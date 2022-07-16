import { ReactNode } from 'react'
import { NavigatorComponent } from './navigator'

export interface Props {
  children: ReactNode
}

export function LayoutComponent({ children }: Props) {
  // __RENDER
  return (
    <div className='ui--profile'>
      <div className='ui--profile-container container'>
        <NavigatorComponent />

        <div className='ui--profile-context'>{children}</div>
      </div>
    </div>
  )
}
