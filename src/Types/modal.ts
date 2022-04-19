import { ReactChild, ReactFragment, ReactPortal } from 'react'

export enum IModal {
  CONNECT_WALLET = '@MODAL:CONNECT_WALLET'
}

export type ModalChildren = ReactChild | ReactFragment | ReactPortal | IModal

export interface Modal {
  vid: string
  visible: boolean
  className?: string
  allowEscape?: boolean
  children: ModalChildren | null
}

export interface ModalOptions extends Pick<Modal, 'className' | 'allowEscape'> {}
