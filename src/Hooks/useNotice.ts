import { notice } from '@/Utils'
import { RefObject, useEffect, useMemo, useState } from 'react'

export function useNoticeItem(nodeRef: RefObject<HTMLDivElement>) {
  // __STATE <React.Hooks>
  const [vid, setVid] = useState<string>('')

  // __EFFECTS
  useEffect(() => {
    const { current } = nodeRef
    if (current) {
      const { dataset }: HTMLDivElement = current.closest('.ui--notice-item')!
      setVid(dataset.vid || '')
    }
  }, [nodeRef])

  // __RETURN
  return useMemo(() => {
    return {
      vid,
      close: () => {
        if (vid) notice.close(vid)
      }
    }
  }, [vid])
}
