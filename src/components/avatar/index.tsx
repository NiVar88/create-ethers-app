import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { getFileListAt, modal } from '@/utils'
import type { AvatarPayload } from '@/types'
import { AvatarEditorComponent as ModalEditor } from './editor'
import cls from 'classnames'

export interface Props {
  className?: string
  image?: string
  onChange?: (dataURL: string) => void
}

export function AvatarComponent({ className, image, onChange }: Props) {
  // __STATE <React.Hooks>
  const nodeRef = useRef<HTMLInputElement>(null)
  const [currentImage, setCurrentImage] = useState<string>('/static/media/99276610.png')

  // __FUNCTIONS
  const handleCancel = useCallback(() => {
    const { current: input } = nodeRef

    modal.off('avatar-editor')
    if (input) input.value = ''
  }, [nodeRef])

  const handleApply = useCallback(
    ({ dataURL }: AvatarPayload) => {
      handleCancel()

      if (onChange) onChange(dataURL)
    },
    [onChange, handleCancel]
  )

  const handleFileChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const file = getFileListAt(target.files, 0)
      if (file) {
        modal.on(<ModalEditor file={file} onApply={handleApply} onCancel={handleCancel} />, {
          className: 'avatar-editor'
        })
      }
    },
    [handleApply, handleCancel]
  )

  // __EFFECTS
  useEffect(() => {
    if (image) setCurrentImage(image)
  }, [image])

  // __RENDER
  return (
    <div className={cls('ui--avatar', className)}>
      <label className='ui--avatar-label' htmlFor='ui--model-avatar' suppressHydrationWarning>
        <img className='ui--avatar-image' src={currentImage} />

        <div className='ui--avatar-hover'>
          <span className='icon bi bi-camera'></span>
          <span className='text'>
            change
            <br />
            avatar
          </span>
        </div>
      </label>

      <input type='file' id='ui--model-avatar' className='ui--avatar-input' onChange={handleFileChange} ref={nodeRef} />
    </div>
  )
}
