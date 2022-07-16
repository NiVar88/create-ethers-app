import { Profile } from '@/components'

export default function CollectableContainer() {
  // __RENDER
  return (
    <Profile.LayoutComponent>
      <div className='ui--profile-collectable'>
        <div className='ui--profile-bar'>
          <Profile.SearchComponent />
        </div>

        <div className='ui--profile-collectable-body'>
          <i>.ui--profile-collectable</i>
        </div>
      </div>
    </Profile.LayoutComponent>
  )
}
