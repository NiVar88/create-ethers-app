import { UseDialog } from '@/constants'
import { Dialog } from '@/types'

export function getCurrentContant({ children }: Dialog) {
  switch (children) {
    case UseDialog.DEMO:
      return <i>ChildrenNode</i>

    default:
      if (typeof children === 'string')
        return <div className='_dangerously' dangerouslySetInnerHTML={{ __html: children }}></div>
      else return children
  }
}
