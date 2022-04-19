import { useState, useMemo, useCallback } from 'react'
import { useController } from 'react-hook-form'
import { getErrors } from '@/Components/Input'
import { InputProps } from '@/Types/input'
import cls from 'classnames'

export function InputProvider({ control, name, value, rules, ...props }: InputProps) {
  // __STATE <React.Hooks>
  const vid = useMemo(() => `ui--form-model-${name}`, [name])
  const isPassword = useMemo(() => props.type === 'password', [])

  const [currentType, setCurrentType] = useState(props.type || 'text')

  const { field, fieldState } = useController({
    name,
    rules,
    defaultValue: value,
    control
  })

  // __FUNCTIONS
  const handleSwitchType = useCallback(() => {
    if (isPassword) setCurrentType((prev) => (prev === 'text' ? 'password' : 'text'))
  }, [])

  // __RENDER
  return (
    <div className='ui--input-provider'>
      <label className={cls('ui--input-label', { required: rules?.required })} htmlFor={vid}>
        {props.icon && <span className={`icon bi bi-${props.icon}`}></span>}
        <span className='text'>{props.label}</span>
      </label>

      <div className='ui--input-desc'>{props.children}</div>

      <div className='ui--input-field'>
        <input
          id={vid}
          type={currentType}
          autoComplete={props.autocomplete}
          placeholder={props.placeholder}
          disabled={props.disabled}
          {...field}
        />

        {isPassword && (
          <a
            className={cls('icon', 'bi', {
              'bi-eye': currentType === 'password',
              'bi-eye-slash': currentType === 'text'
            })}
            onClick={handleSwitchType}
          ></a>
        )}
      </div>

      <span className='ui--input-errors'>{getErrors(fieldState.error)}</span>
    </div>
  )
}
