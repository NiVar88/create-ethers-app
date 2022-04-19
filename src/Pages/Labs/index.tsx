import { useCallback, useState, useTransition } from 'react'
import { ModalComponent } from '@/Components'
import { configs } from '@/Constants'
import { useAuth, useModal } from '@/Hooks'
import { BaseService } from '@/Services/base.service'
import { dialog, setCookie } from '@/Utils'
import { FormLabs } from './Components/form'
import JWT from 'jsonwebtoken'
import '@Styles/pages/labs.scss'

export default function LabsContainer() {
  // __STATE <React.Hooks>
  const [count, setCount] = useState<number>(0)
  const [isPadding, startTransition] = useTransition()

  const { signout } = useAuth()
  const modal = useModal({ className: 'modal-labs' })

  // __FUNCTIONS
  const handleClick = useCallback(() => {
    startTransition(() => {
      setCount((prev) => prev + 1)
    })
  }, [])

  const handleDialog = useCallback(async () => {
    const { isConfirmed, isDenied } = await dialog('Content.')
    console.log({ isConfirmed, isDenied })
  }, [])

  const handleModal = useCallback(() => {
    modal.on(
      <ModalComponent title='Modal Labs'>
        <i>Content.</i>
      </ModalComponent>
    )
  }, [modal])

  const handleCookie = useCallback(() => {
    setCookie(configs.APP_AUTH_ACCESS, JWT.sign({ uid: 1 }, 'S3C23T', { expiresIn: '1h' }))
    setCookie(configs.APP_AUTH_REFRESH, JWT.sign({ uid: 1 }, 'S3C23T', { expiresIn: '7 days' }))
  }, [])

  const handleService = useCallback(async () => {
    const r = await BaseService.get('todos/1')
    console.log(r)
  }, [])

  // __EFFECTS

  // __RENDER
  return (
    <div className='ui--labs'>
      <div className='ui--labs-container'>
        <i style={{ display: 'block', padding: '1rem 0' }}>
          .ui--labs-container: <b>{count}</b>
        </i>

        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridAutoFlow: 'dense',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, auto))',
            margin: '0 0 2rem'
          }}
        >
          <button className='btn btn-primary' onClick={handleClick}>
            <span className='text'>button</span>
          </button>

          <button className='btn btn-primary' onClick={handleDialog}>
            <span className='text'>dialog</span>
          </button>

          <button className='btn btn-primary' onClick={handleModal}>
            <span className='text'>modal</span>
          </button>

          <button className='btn btn-primary' onClick={signout}>
            <span className='text'>sign-out</span>
          </button>

          <button className='btn btn-primary' onClick={handleCookie}>
            <span className='text'>set cookies</span>
          </button>

          <button className='btn btn-primary' onClick={handleService}>
            <span className='text'>service</span>
          </button>
        </div>

        <FormLabs />
      </div>
    </div>
  )
}
