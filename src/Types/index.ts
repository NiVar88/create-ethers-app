import { Dialog } from '@/Utils/dialog'
import { Modal } from '@/Utils/modal'
import { Notice } from '@/Utils/notice'

export type { Dialog, Modal, Notice }

export type Theme = 'default' | 'light' | 'dark'

export enum IDialog {
  DEMO = '@DIALOG:DEMO'
}

export enum IModal {
  CONNECT_WALLET = '@MODAL:CONNECT_WALLET'
}
