import { useEffect, useState } from 'react'
import { getMediaBlob } from '@/utils'
import type { IMedia } from '@/types'
import cls from 'classnames'

export interface Props {
  className?: string
  src: string | Blob | File
  autoPlay?: boolean
}

export function MediaComponent({ className, src, autoPlay }: Props) {
  // __STATE <React.Hooks>
  const [state, setState] = useState<IMedia>({ url: '' })

  // __EFFECTS
  useEffect(() => {
    if (src) getMediaBlob(src).then(setState)
  }, [src])

  // __RENDER
  return (
    <div className={cls('ui--media', className)} suppressHydrationWarning>
      {state.isImage && <img className='ui--media-element media image' src={state.url} />}
      {state.isVideo && (
        <video className='ui--media-element media video' loop muted playsInline src={state.url} autoPlay={autoPlay} />
      )}
      {state.isAudio && <audio loop controls className='ui--media-element media audio' src={state.url} />}
    </div>
  )
}
