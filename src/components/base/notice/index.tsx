import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appActions, appSelector } from '@/store'
import type { Notice } from '@/types'
import { NoticeItem } from './item'

export default function NoticeContainer() {
  // __STATE <React.Hooks>
  const dispatch = useDispatch()
  const notices = useSelector(appSelector.getNotice)
  const icons = useMemo(
    () => ({
      info: 'bi-info-circle',
      success: 'bi-check-circle',
      warn: 'bi-exclamation-circle',
      error: 'bi-x-circle'
    }),
    []
  )

  // __FUNCTIONS
  const handleRemove = useCallback((notice: Notice) => {
    const payload: Notice = {
      ...notice,
      vid: `rm: ${notice.vid}`,
      visible: false
    }

    dispatch(appActions.setNotice(payload))
  }, [])

  // __RENDER
  return (
    <div className='ui--notice'>
      {notices.map((record, index) => (
        <NoticeItem key={index} record={record} icon={icons[record.type]} onRemove={handleRemove} />
      ))}
    </div>
  )
}
