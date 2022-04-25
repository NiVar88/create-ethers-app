import { Link } from 'react-router-dom'
import { UserComponent } from './user'

export function HeaderComponent() {
  // __STATE <React.Hooks>

  // __FUNCTIONS

  // __EFFECTS

  // __RENDER
  return (
    <header className='ui--header'>
      <div className='ui--header-container'>
        <div className='ui--header-context ltr'>
          <Link className='btn btn-logo' to='/'>
            <span>unset</span>
            <span>logo</span>
          </Link>

          <div>.ui--header-container</div>
        </div>

        <div className='ui--header-context rtl'>
          <UserComponent />
        </div>
      </div>
    </header>
  )
}
