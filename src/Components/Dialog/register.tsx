import { Dialog, IDialog } from '@/Types'

export function getCurrentContant({ children }: Dialog) {
  switch (children) {
    case IDialog.DEMO:
      return <i>ChildrenNode</i>

    default:
      if (typeof children === 'string')
        return <div className='_dangerously' dangerouslySetInnerHTML={{ __html: children }}></div>
      else return children
  }
}
