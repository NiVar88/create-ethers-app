import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector, appActions, appSelector } from '@/Collects'
import { Notice } from '@/Types'
import { NoticeItem } from './item'

export function NoticeContainer() {
  // __STATE <React.Hooks>
  const dispatch = useAppDispatch()
  const notices = useAppSelector(appSelector.getNotice)
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
      {notices.map((record) => (
        <NoticeItem key={record.vid} record={record} icon={icons[record.type]} onRemove={handleRemove} />
      ))}
    </div>
  )
}
