import { Modal, IModal } from '@/Types'

export function getCurrentContant({ children }: Modal) {
  switch (children) {
    case IModal.CONNECT_WALLET:
      return null

    default:
      return children
  }
}
