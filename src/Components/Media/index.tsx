import { IMedia } from '@/Types'
import { getMediaBlob } from '@/Utils'
import { useEffect, useState } from 'react'

export interface Props {
  src: string | Blob | File
  autoPlay?: boolean
}

export function MediaComponent({ src, autoPlay }: Props) {
  // __STATE <React.Hooks>
  const [state, setState] = useState<IMedia>({ url: '' })

  // __EFFECTS
  useEffect(() => {
    async function start() {
      const blob = await getMediaBlob(src)
      setState(blob)
    }

    if (src) start()
  }, [src])

  // __RENDER
  return (
    <div className='ui--media'>
      {state.isImage && <img className='ui--media-element media image' src={state.url} />}
      {state.isVideo && (
        <video className='ui--media-element media video' loop muted playsInline src={state.url} autoPlay={autoPlay} />
      )}
      {state.isAudio && <audio loop controls className='ui--media-element media audio' src={state.url} />}
    </div>
  )
}
