import { useCallback, useEffect, useState, useTransition } from 'react'
import { dialog, generateId, modal, notice } from '@/utils'

export default function LabsContainer() {
  // __STATE <React.Hooks>
  const [count, setCount] = useState<number>(0)
  const [isPadding, startTransition] = useTransition()

  const [state, setState] = useState<any[]>([])

  // __FUNCTIONS
  const handleClick = useCallback(() => {
    startTransition(() => {
      setCount((prev) => prev + 1)
    })
  }, [])

  const handleDialog = useCallback(async () => {
    const resp = await dialog('Generate Lorem Ipsum placeholder text.', { type: 'confirm' })
    console.table(resp)
  }, [])

  const handleModal = useCallback(() => {
    const Component = () => (
      <div style={{ padding: '2.5rem', backgroundColor: 'white' }}>
        <i>Generate Lorem Ipsum placeholder text.</i>
      </div>
    )

    modal.on(<Component />, {
      className: 'labs-modal'
    })
  }, [])

  const handleNotice = useCallback(() => {
    const noticeId = generateId()
    notice.info({
      vid: noticeId,
      title: 'Notice Title',
      content: 'Generate Lorem Ipsum placeholder text.'
    })
  }, [])

  // __EFFECTS
  useEffect(() => {
    fetch('/api/space?album=1')
      .then((resp) => resp.json())
      .then((resp) => {
        setState(resp)
      })
  }, [])

  // __RENDER
  return (
    <div className='ui--labs-container container'>
      <div className='rows'>
        <i>.ui--labs-container</i>
      </div>

      <div className='rows grid'>
        <button className='btn btn-primary' onClick={handleClick}>
          <span className='text'>
            count ~ <b>{count}</b>
          </span>
        </button>

        <button className='btn btn-primary' onClick={handleDialog}>
          <span className='text'>dialog</span>
        </button>

        <button className='btn btn-primary' onClick={handleModal}>
          <span className='text'>modal</span>
        </button>

        <button className='btn btn-primary' onClick={handleNotice}>
          <span className='text'>notice</span>
        </button>
      </div>

      <div className='rows grid-2'>
        {state.map((record, index) => (
          <div className='lorem' key={index}>
            <img className='poster' src={record.posters[0]} loading='lazy' />
            <i className='name'>{record.name}</i>
          </div>
        ))}
      </div>
    </div>
  )
}
