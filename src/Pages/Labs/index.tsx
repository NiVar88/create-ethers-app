import { useCallback, useState, useTransition } from 'react'
import { ModalComponent } from '@/Components'
import { configs } from '@/Constants'
import { useERC721Contract, useModal } from '@/Hooks'
import { BaseService } from '@/Services/base.service'
import { dialog, Fraction } from '@/Utils'
import '@Styles/pages/labs.scss'

export default function LabsContainer() {
  // __STATE <React.Hooks>
  const [count, setCount] = useState<number>(0)
  const [isPadding, startTransition] = useTransition()

  const modal = useModal({ className: 'modal-labs' })
  const contract = useERC721Contract('0x7FB2f667CEa0d8c0939761eFB49C4d9162cfbE10')

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

  const handleService = useCallback(async () => {
    const r = await BaseService.get('todos/1')
    console.log(r)
  }, [])

  const handleGetNft = useCallback(async () => {
    // contract.mint('0x0', Fraction.ZERO, '', '')
    const resp = await contract.balanceOf('0xbd5545fC37EC04ccB92Ef0754f7dbDc1BA9a25A4')
    console.log(resp)
  }, [contract])

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

          <button className='btn btn-primary' onClick={handleService}>
            <span className='text'>service</span>
          </button>

          <button className='btn btn-primary' onClick={handleGetNft}>
            <span className='text'>get nft</span>
          </button>
        </div>
      </div>
    </div>
  )
}
