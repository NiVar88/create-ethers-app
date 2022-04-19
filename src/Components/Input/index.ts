import { FieldError } from 'react-hook-form'

export { InputProvider } from './Main'

export const getErrors = (errors?: FieldError | FieldError[]): string | null => {
  if (!errors) return null
  let results: any = ''
  let error = errors instanceof Array ? errors[0] : errors

  switch (error.type) {
    case 'required':
      results = error.message || 'This Field is required!'
      break

    default:
      results = error.message
      break
  }

  return results
}
