import { Outlet } from 'react-router-dom'
import { FooterComponent, HeaderComponent } from '@/Components'

export function LayoutWrapper() {
  // __STATE <React.Hooks>

  // __FUNCTIONS

  // __EFFECTS

  // __RENDER
  return (
    <div className='ui--layout-wrapper'>
      <HeaderComponent />

      <main className='ui--router-view'>
        <Outlet />
      </main>

      <FooterComponent />
    </div>
  )
}
