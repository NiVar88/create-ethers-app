import { ConnectWallet } from '@/components/connect-wallet'
import { ModalName } from '@/constants'
import type { Modal } from '@/types'

export function getCurrentContant({ content }: Modal) {
  switch (content) {
    case ModalName.CONNECT_WALLET:
      return <ConnectWallet />

    default:
      return content
  }
}
