import { Profile } from '@/components'

export default function FavoriteContainer() {
  // __RENDER
  return (
    <Profile.LayoutComponent>
      <div className='ui--profile-favorite'>
        <div className='ui--profile-bar'>
          <Profile.SearchComponent />
        </div>

        <div className='ui--profile-favorite-body'>
          <i>.ui--profile-favorite</i>
        </div>
      </div>
    </Profile.LayoutComponent>
  )
}
