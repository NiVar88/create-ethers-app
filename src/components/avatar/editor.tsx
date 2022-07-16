import { useRef, useState, useEffect, ChangeEvent, useCallback } from 'react'
import type { AvatarPayload } from '@/types'
import AvatarEditor from 'react-avatar-editor'

export interface Props {
  file: File
  onApply: (payload: AvatarPayload) => void
  onCancel: () => void
}

export function AvatarEditorComponent({ file, onApply, onCancel }: Props) {
  // __STATE <React.Hooks>
  const nodeRef = useRef<any>(null)

  const [currentFile] = useState<File>(file)
  const [scale, setScale] = useState<number>(1)
  const [size, setSize] = useState({
    width: 256,
    height: 256,
    border: [52, 0]
  })

  // __FUNCTIONS
  const handleApply = useCallback(() => {
    const { current: canvas } = nodeRef
    if (canvas) {
      onApply({
        name: currentFile.name,
        type: currentFile.type,
        dataURL: canvas.getImageScaledToCanvas().toDataURL()
      })
    }
  }, [nodeRef, currentFile, onApply])

  const handleScaleChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = Number(target.value)
    setScale(value)
  }, [])

  // __EFFECTS
  useEffect(() => {
    if (currentFile) {
      const { innerWidth } = window

      if (innerWidth < 440) {
        let calc = innerWidth - 144
        setSize({
          width: calc,
          height: calc,
          border: [32, 0]
        })
      } else {
        setSize({
          width: 256,
          height: 256,
          border: [52, 0]
        })
      }
    }
  }, [currentFile])

  useEffect(() => {
    return () => {
      const { current: canvas } = nodeRef
      if (canvas) canvas.clearImage()
    }
  }, [nodeRef])

  // __RENDER
  return (
    <div className='ui--avatar-editor'>
      <div className='ui--avatar-editor-header'>
        <h2 className='h2'>edit image</h2>
      </div>

      <div className='ui--avatar-editor-body'>
        <AvatarEditor
          ref={nodeRef}
          className='ui--avatar-editor-canvas'
          image={currentFile}
          scale={scale}
          width={size.width}
          height={size.height}
          border={size.border}
          borderRadius={320}
          color={[14, 15, 27, 0.75]}
        />

        <div className='ui--avatar-editor-scale'>
          <span className='icon x1 bi bi-image-fill'></span>
          <input type='range' step='0.01' min='1' max='2' defaultValue={scale} onChange={handleScaleChange} />
          <span className='icon x2 bi bi-image-fill'></span>
        </div>
      </div>

      <div className='ui--avatar-editor-footer'>
        <button className='btn btn-text btn-cancel' onClick={onCancel}>
          <span className='text'>cancel [ESC]</span>
        </button>

        <button className='btn btn-primary btn-apply' autoFocus onClick={handleApply}>
          <span className='text'>apply</span>
        </button>
      </div>
    </div>
  )
}
