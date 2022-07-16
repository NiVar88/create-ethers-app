import { ChangeEvent, useCallback } from 'react'

export interface Props {
  onChange?: (value: string) => void
}

export function SearchComponent({ onChange }: Props) {
  // __STATE <React.Hooks>

  // __FUNCTIONS
  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(target.value)
    },
    [onChange]
  )

  // __RENDER
  return (
    <div className='ui--profile-search'>
      <input className='input' placeholder='Search by name' maxLength={32} onChange={handleChange} />
      <span className='icon bi bi-search'></span>
    </div>
  )
}
