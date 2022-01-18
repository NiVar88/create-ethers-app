import { AccountDetails, ConnectWallet } from '@/components'
import { UseModal } from '@/constants'
import { Modal } from '@/types'

export function getCurrentContant({ children }: Modal) {
  switch (children) {
    case UseModal.CONNECT_WALLET:
      return <ConnectWallet />

    case UseModal.ACCOUNT_DETAILS:
      return <AccountDetails />

    default:
      return children
  }
}
