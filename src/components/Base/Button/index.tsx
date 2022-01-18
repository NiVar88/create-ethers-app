import { MouseEventHandler, useMemo } from 'react'
import cls from 'classnames'

export type Styles = 'primary' | 'green' | 'blue' | 'purple' | 'violet' | 'brown' | 'orange'
export interface ButtonProps {
  style: Styles
  text?: string
  subtext?: string
  loading?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export function ButtonComponent({ style, text, loading, disabled, onClick }: ButtonProps) {
  // __STATE <React.Hooks>
  const isDisabled = useMemo(() => disabled || loading, [loading, disabled])

  // __RENDER
  return (
    <button className={cls('btn', `btn-${style}`)} disabled={isDisabled} onClick={onClick}>
      <span className='text'>{text || 'button'}</span>
    </button>
  )
}
