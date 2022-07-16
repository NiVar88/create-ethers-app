import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { appSelector } from '@/store'
import cls from 'classnames'

export default function LoaderContainer() {
  // __STATE <React.Hooks>
  const loader = useSelector(appSelector.getLoader)
  const [visible, setVisible] = useState<boolean>(false)

  // __FUNCTIONS
  const breakAllKeyboardEvents = useCallback((e: KeyboardEvent) => {
    e.preventDefault()
  }, [])

  // __EFFECTS
  useEffect(() => {
    if (loader) {
      setVisible(true)
      addEventListener('keydown', breakAllKeyboardEvents)
    } else {
      setTimeout(() => setVisible(false), 320)
      removeEventListener('keydown', breakAllKeyboardEvents)
    }
  }, [loader])

  // __RENDER
  if (!visible) return null
  return (
    <div className='ui--loader'>
      <div className={cls('ui--loader-progress', { done: !loader })}></div>
    </div>
  )
}
