import { Outlet } from 'react-router-dom'
import { NavbarComponent, FooterComponent } from '@/components'

export function LayoutWrapper() {
  // __RENDER
  return (
    <div className='ui--layout-wrapper'>
      <NavbarComponent />
      <Outlet />
      <FooterComponent />
    </div>
  )
}
