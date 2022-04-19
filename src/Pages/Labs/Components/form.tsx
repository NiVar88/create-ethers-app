import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { InputProvider } from '@/Components/Input'
import { urlValidator } from '@/Utils/validator'

export interface FormContext {
  name: string
}

export function FormLabs() {
  // __STATE <React.Hooks>
  const { handleSubmit, control } = useForm<FormContext>({ defaultValues: { name: '' } })

  // __FUNCTIONS
  const submit = useCallback((data: FormContext) => {
    console.log(data)
  }, [])

  // __EFFECTS

  // __RENDER
  return (
    <form onSubmit={handleSubmit(submit)}>
      <InputProvider
        key='.name'
        name='name'
        label='name'
        placeholder='Unnamed'
        control={control}
        rules={{ required: true, pattern: urlValidator() }}
      />

      <button className='btn btn-primary' type='submit'>
        <span className='text'>submit</span>
      </button>
    </form>
  )
}
